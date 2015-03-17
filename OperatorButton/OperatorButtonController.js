function OperatorButtonController(model, view, dep){

	BaseButtonController.call(this,model,view,dep);
	this.init();
};

OperatorButtonController.prototype = Object.create(BaseButtonController.prototype);

OperatorButtonController.prototype.constructor = OperatorButtonController;

OperatorButtonController.prototype.init = function(){
		for(var i = 0; i < this.view.objects.length; i++){
			this.view.elements[i].onclick = function(e){
				//emit functions
				console.log(e.target.value+"clicked");
			};
		}
};