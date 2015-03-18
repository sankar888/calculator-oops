function CalculatorController(model, view, dep){

	this.model = model;
	this.view = view;
	this.dep = dep;
	this.init();
}

CalculatorController.prototype = {

	init : function(){

		this.operators = ['+','-','*','/','^'];
		var numberArr = ['0','1','2','3','4','5','6','7','8','9'];//numbers allowed
		this.expectedArr = {// this array holds the valid characters allowed after
			'O' : numberArr.concat(this.operators).concat(['(','.']), // O - operators
			'.' : numberArr, // . operator
			'(' : numberArr.concat(['.','-','(']), // open braces
			')' : this.operators.concat([')']), // close braces
			'N' : numberArr.concat(this.operators).concat([')','.']), // N- Number
			'R' : numberArr.concat(this.operators).concat(['(','.']) // R - Result State
		};
		this.initiallyExpected = numberArr.concat(['.','(']); // Initially expected values
		
		this.lastToken = '';
		this.isResult = false;
		this.expected = this.initiallyExpected;
		this.dep.eventBus.observe("NumberButtonClicked",this.processInput,this);
		this.dep.eventBus.observe("OperatorButtonClicked",this.processInput,this);
	},

	isOperator : function(key){
		return this.operators.indexOf(key) > -1;
	},

	isNumber : function(key){
		return key && window.isFinite(key) || 0 === key;
	},

	//is valid token + state is checked
	isExpected : function(key){
		return this.expected && (this.expected.indexOf(key) > -1);
	},
	
	//convers array values to to single string [1,2,3] => '123'
	arrToString : function(arr){
		return arr.toString().replace(/[\,]/g,'');
	},

	isDot : function(key){
		return '.' === key;
	},

	//function to restrict the illegal dot in a number ex: 2.33.4 , ..3
	illegalDot : function(){
		var lastposition = this.model.expression.lastIndexOf('.');
		if(this.model.expression && this.model.expression.length && lastposition > -1){
			var sub = this.model.expression.slice(lastposition+1);
			return this.isNumber(this.arrToString(sub));
		}
		else
		{
			return false;
		}
	},

	//is valid + dot is checked for validity
	validForProcessing : function(key){
		return this.isExpected(key) && !(this.isDot(key) && this.illegalDot()); 
	},

	isContinousOperator : function(key){
		return this.isOperator(key) && this.isOperator(this.lastToken);
	},

	isClearResult : function(key){
		return !this.isNumber(this.lastToken) || !this.isOperator(key);
	},

	//formats the result @param {String}
	formatResult : function(res){
		console.log('result is '+res);
		if(window.isNaN(res)){
			res = 'Operation Not Possible';
		}
		return res;
	},

	//check if the expression is valid @param {array}
	isBracesMisMatch : function(expression){
		var openCount = 0, 
			closeCount =0;
		if(expression && expression instanceof Array){
			var token;
			for(var i = 0; i < expression.length; i++){
				token = expression[i];
				if('(' === token ){
					openCount++;
				}else if( ')' === token){
					closeCount++;
				}
			}	
		}
		return (openCount !== closeCount);
	},

	//this function forms the expression from the array of tokens @param {Array}
	//ex : [1,2,-,(,-,3,)] will be processed to [12,-,(,-3,)]
	formExpression : function(expression){
		var temp = [],
			op = [],
			key,
			lastToken;
		for(var i=0; i<expression.length; i++){
			key = expression[i];
			if((lastToken === '(' && key === '-') || key==='.' || window.isFinite(key)){
				temp.push(key);
			}else{
				if(temp.length > 0){
					op.push(this.arrToString(temp));
					temp.length = 0;
				}
				op.push(key);
			}
			lastToken = key;
		}
		if(temp.length > 0){
			op.push(this.arrToString(temp));
		}
		return op;
	},

	push : function(key){
		this.model.push(key);
		this.lastToken = key;
		this.refreshExpected(key);
		this.dep.display.append(key);
	},

	pop : function(){
		this.model.pop();
		this.lastToken = this.model.expression[this.model.expression.length - 1] || '';
		this.refreshExpected(this.lastToken);
		if(this.isResult){
			this.dep.display.clear();
		}
		else{
			this.dep.display.clearLast();
		}
	},

	clear : function(){
		this.model.clear();
		this.lastToken = '';
		this.refreshExpected();
		this.dep.display.clear();
	},

	setResultState : function(result){
		this.isResult = result;
		if(result){
			if(window.isFinite(this.model.expression[this.model.expression.length-1])){
				this.refreshExpected('R');
			}
			else{
				this.refreshExpected('');
			}
		}
	},

	//refresh the expected array after each memory operation.
	// @param {String} - key should be one of values in expectedArray
	//pass Undefined {key} to set the expected state to initial state 
	refreshExpected : function(key){
		if(!key && 0 !== key){
			this.expected = this.initiallyExpected;
			return 0;
		}
		if(key && window.isFinite(key) || 0 === key){
			key = 'N';
		}
		else if (this.operators.indexOf(key) > -1){
			key = 'O';
		}
		this.expected = this.expectedArr[key];
	},

	//converts the given expression to (RPN - reverse polish Notation) format
	convertToRPN : function(expression){
		var precedenceMap = {
			'^' : 4, 
			'/' : 3,
			'*'	: 3,
			'+' : 2,
			'-' : 2,
			'(' : 1
		};
		var operands = ['+','-','/','*','^'];
		var associativeArr = ['/','-','*','+','^'];
		var output = [];
		var opArray = [];
		var token, lastOpIndex, lastOpPrecedence, incomingOpPrecedence;
		
		for(var i = 0; i < expression.length; i++)
		{
			token = expression[i];
			lastOpIndex = opArray.length-1;
			lastOpPrecedence = precedenceMap[opArray[lastOpIndex]];
			incomingOpPrecedence = precedenceMap[token];
					
			if(token && !window.isNaN(token))
			{
				output.push(token);
			}
			else if(token && opArray.length > 0 && token === ')')
			{
				while(opArray[opArray.length-1] != '(')
				{
					output.push(opArray.pop());
				}
				opArray.pop();
			}
			else if(token && opArray.length > 0 && operands.indexOf(token) > -1 && ((incomingOpPrecedence < lastOpPrecedence) ||
					 (lastOpPrecedence === incomingOpPrecedence && associativeArr.indexOf(token) > -1)))
			{
				output.push(opArray.pop());
				opArray.push(token);
			}
			else
			{
				opArray.push(token);
			}
			//console.log("token is "+token+" output"+ output.toString()+" oparr "+opArray.toString());
		}
		//joins the two arr
		output = output.concat(opArray.reverse());
		//console.log("output is "+output);
		return output;
	},

	
	//pop up operands for evaluating rpn @param {Array}
	popOperands : function(output){
		this.second = Number(output.pop());
		this.first = Number(output.pop());
	},

	//evaluates the rpn expression @param {Array}
	evaluateRPN : function(rpnExpression){
			
		this.first;
		this.second; 
		var output = [];
		var result;
		for(var i = 0; i < rpnExpression.length; i++){
			result = rpnExpression[i];
			switch (result) {

				case '+' :  this.popOperands(output);
							result = this.first + this.second;
							output.push(result);
							break;

				case '-' :  this.popOperands(output);
							result = this.first - this.second;
							output.push(result);
							break;

				case '*' :  this.popOperands(output);
							result = this.first * this.second;
							output.push(result);
							break;

				case '/' :  this.popOperands(output);
							result = this.first / this.second;
							output.push(result);
							break;

				case '^' :  this.popOperands(output);
							result = Math.pow(this.first,this.second);
							output.push(result);
							break;

				default :  output.push(result);
						   break;
			}
		}
		if(output.length > 1){
			throw new EvalError('Error while evaluating expression', 'calculator.js');
		}
		return output.pop();
	},

	calculate : function(expression){
		var rpn = this.convertToRPN(expression);
		return this.evaluateRPN(rpn);
	},

	//validate the each keyed in token and adds it the expression memory , uses validator to validate
	processInput : function(event){

		var key = event.target.getAttribute('value');
		if(key === 'C'){
			this.pop();
			return 0;
		}
		if(key === '='){
			this.processExpression();
			return 0;
		}
		// if the keyed in token is not valid do not add it to the memory
		if(!this.validForProcessing(key)){
			return 0;
		}

		// habdles the token after result state
		if((this.isResult && this.isClearResult(key)) || this.isContinousOperator(key)){
			console.log("into clear");
			this.pop();
		}

 		//if valid operator pushing it to the memory and displaying the operator
		this.push(key);
		this.setResultState(false);
	},

	//process the expression in memory and format the appropriate error message
	processExpression : function(event){
		var result,
			expression = this.model.expression;
		//checking the validity for the expression
		if(expression.length === 0 || this.isBracesMisMatch(expression)){
			console.log('braces mismatch');
			return 0;
		}
		expression = this.formExpression(expression); //forms the infix expression
		try{
			result = this.calculate(expression); // evaluates the expression and return the result
			result = this.formatResult(result); //formats the result
		}
		catch(e){
			console.log("error while evaluating"+e.message);
			result = "Invalid Expression";
		}

		//setting the result in memory and updating the state
	 	this.clear();
		this.push(result);
		this.setResultState(true);
	}

};