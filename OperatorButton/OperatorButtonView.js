function OperatorButtonView(config){

	this.keys = ['+','-','/','^','*'];
	BaseButtonView.call(this,config);
	this.init();
}

OperatorButtonView.prototype = Object.create(BaseButtonView.prototype);
OperatorButtonView.prototype.constructor = OperatorButtonView;

OperatorButtonView.prototype.init : function(){
	this.elements = this.buildObjects();
};



