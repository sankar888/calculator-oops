function DisplayController(model, view, dep){
	
	this.model = model;
	this.view = view;
	this.dep = dep;
}

DisplayController.prototype = {

	show : function(token){
		$(this.view.element).val(token);
	},

	clear : function(){
		$(this.view.element).val("");
	},

	append : function(token){
		var v = $(this.view.element).val();
		$(this.view.element).val(v+token);
	},

	clearLast : function(){
		var val = $(this.view.element).val();
		if(val.length > 0){
			val = val.substring(0,val.length-1);
		}
		this.show(val);
	}


}