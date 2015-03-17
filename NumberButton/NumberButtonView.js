function NumberButtonView(config){

	this.keys = [0,1,2,3,4,5,6,7,8,9];
	BaseButtonView.call(this,config);
	this.init();
}

NumberButtonView.prototype = Object.create(BaseButtonView.prototype);
NumberButtonView.prototype.constructor = NumberButtonView;

NumberButtonView.prototype.init : function(){
	this.elements = this.buildObjects();
};



