function BaseButtonView(config){
	
	this.allowed = ['class'];
	this.elements = [];
	this.init(config);
};

BaseButtonView.prototype = {

	init : function(config){
		for(var i in config){
			if(this.allowed.indexOf(i) > -1){
				this[key] = config[key];
			}
		}
	},

	buildObjects : function(){
		var inp = ''
		for(var i = 0; i < this.keys.length; i++){
			inp = $(inp).add($('<input type = "button">')
					.addClass(this.class)
					.val(this.keys[i]));
		}
		return inp;
	}
}
