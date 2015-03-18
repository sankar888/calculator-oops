function DisplayView(config){
	
	this.allowed = ['class'];
	this.element = '';
	this.init(config);
}

DisplayView.prototype = {

	init : function(config){
		for(var i in config){
			if(this.allowed.indexOf(i) > -1){
				this[i] = config[i];
			}
		}
		this.build();
	},

	build : function(){
		this.element = $('<input id="display" type="text" disabled=true value="">').addClass(this.class);
	}
}