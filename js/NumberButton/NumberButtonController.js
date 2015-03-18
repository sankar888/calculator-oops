function NumberButtonController(model, view, dep){

	BaseButtonController.call(this,model,view,dep);
	this.init();
};

NumberButtonController.prototype = Object.create(BaseButtonController.prototype);

NumberButtonController.prototype.constructor = NumberButtonController;

NumberButtonController.prototype.init = function(){
		for(var i = 0; i < this.view.elements.length; i++){
			this.view.elements[i].onclick = (function(e){
				//emit functions
				this.dep['eventBus'].emit('NumberButtonClicked', e);
			}).bind(this);
		}
};