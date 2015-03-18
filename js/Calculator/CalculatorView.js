function CalculatorView(config){

	this.allowed = ['displayView','numberView','operatorView','class','id'];
	this.element = '';
	this.init(config);
}

CalculatorView.prototype = {

	init : function(config){
		for(var i in config){
			if(this.allowed.indexOf(i) > -1){
				this[i] = config[i];
			}
		}
		this.build();
	},

	build : function(){
		var wrapper = $('<div></div>').addClass(this.class).attr('id',this.id);
		var keysSection = $('<div></div>').css({'position':'relative','padding-top' : '10px'});
		keysSection.append(this.numberView.elements)
				.append(this.operatorView.elements)
				.append($('<span class="clear"></span>'));
		wrapper.append(this.displayView.element).append(keysSection);
		this.element = wrapper;
	}

};