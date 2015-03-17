function DisplayController(model, view, dep){
	
	this.model = model;
	this.view = view;
	this.dep = dep;
}

DisplayController.prototype = {

	show : function(token){
		this.view.element.value = token;
	},

	clear : function(){
		this.view.element.value = '';
	},

	append : function(token){
		this.view.element.value += token;
	},

	clearLast : function(){
		var val = this.view.element.value;
		if(val.length > 0){
			val = val.substring(0,val.length-1);
		}
	}


}