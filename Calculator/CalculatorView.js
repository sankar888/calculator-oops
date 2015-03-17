function CalculatorView(config){

	this.allowed = ['display','numberView','operatorView','class','id'];
	this.element = '';
	this.init(config);
}

CalculatorView.prototype = {

	init : function(config){
		for(var i in config){
			if(this.allowed.indexOf(i) > -1){
				this[key] = config[key];
			}
		}
		this.build();
	},

	build : function(){
		var wrapper = $('<div></div>').addClass(this.class).attr('id',this.id);
		var keysSection = $('<div></div>').style('position','relative');
		keySection.append(this.numberView.elements)
				.append(this.operatorView.elements);
		wrapper.append(this.display.element).append(keySection);
		wrapper.appendTo(document.body);
	}

};