function NumberButtonController(model, view, dep){

	BaseButtonController.call(this,model,view,dep);
	this.init();
};

NumberButtonController.prototype = Object.create(BaseButtonController.prototype);

NumberButtonController.prototype.constructor = NumberButtonController;

NumberButtonController.prototype.init = function(){
		for(var i = 0; i < this.view.objects.length; i++){
			this.view.elements[i].onclick = function(e){
				//emit functions
				console.log(e.target.value+"clicked");
			};
		}
};