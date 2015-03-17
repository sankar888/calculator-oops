
//base button controller which gets subclassed by number and operator buttons
function BaseButtonController(model, view, dep){

	this.model = model;
	this.view = view;
	this.dep = dep;
	this.init();
}

BaseButtonController.prototype = {

	init : function(){
		this.addDependency(this.dep);
	},

	addDependency : function(){
		if(this.dep && $.isPlainObject(this.dep)){
			for(var key in this.dep){
				this[key] = this.dep[key];
			}
		}
	},
}