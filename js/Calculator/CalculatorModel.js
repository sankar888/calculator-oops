function CalculatorModel(){

	this.expression = [];

}

CalculatorModel.prototype = {

	push : function(key){
		this.expression.push(key);
	},

	pop : function(key){
		this.expression.pop(key);
	},

	clear : function(){
		this.expression.length = 0;
	}
}