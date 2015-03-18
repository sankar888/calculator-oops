function Calculator(config){

	config = config || {};
	this.init(config);
	Calculator.no++;
}

Calculator.prototype = {

	init : function(config){

		this.keyClass = config['keyClass'] || 'keys';
		this.operatorClass = config['operatorClass'] || 'keys sep';
		this.displayClass = config['displayClass'] || 'display';
		this.calcClass = config['calcClass'] || 'wrapper';
		this.buildCalculator();
	},

	buildCalculator : function(){

		var EventBus = new EventBusClass();
		var dep = {eventBus : EventBus};
		var numberButtonModel = new NumberButtonModel();
		var numberButtonView = new NumberButtonView({
			class : this.keyClass
		});
		var numberButtonController = new NumberButtonController(numberButtonModel, numberButtonView, dep);

		var operatorButtonModel = new OperatorButtonModel();
		var operatorButtonView = new OperatorButtonView({
			class : this.operatorClass
		});
		var operatorButtonController = new OperatorButtonController(operatorButtonModel, 
			operatorButtonView, dep);

		var displayModel = new DisplayModel();
		var displayView = new DisplayView({
			class : this.displayClass
		});
		var displayController = new DisplayController(displayModel, displayView);

		dep['display'] =  displayController;
		var calculatorModel = new CalculatorModel();
		var calculatorView = new CalculatorView({
			class : this.calcClass,
			displayView : displayView,
			numberView : numberButtonView,
			operatorView : operatorButtonView
		});
		var calculatorController = new CalculatorController(calculatorModel, calculatorView, dep);
		this.calculator = calculatorView;
	},

	show : function(ele){
		if(ele){
			$(this.calculator.element).appendTo($(ele));
		}
		else{
			$(this.calculator.element).appendTo(document.body);
		}
	}
}
Calculator.no = 0;