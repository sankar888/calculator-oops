function DisplayView(config){
	
	this.allowed = ['class'];
	this.element = '';
	this.init(config);
}

DisplayView.prototype = {

	init : function(config){
		for(var i in config){
			if(this.allowed.indexOf(i) > -1){
				this[key] = config[key];
			}
		}
		this.build();
	},

	build : function(){
		this.element = $('<input type="text" disabled>').addClass(this.class).val('');
	}
}