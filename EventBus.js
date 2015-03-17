function EventBusClass(){
	this.listeners = {};
}

EventBusClass.prototype = {

	observe : function(type, callback, scope)
		if(typeof this.listeners[type] != 'undefined'){
			this.listeners[type].push({type : type, callback : callback, scope : scope});
		}
		else{
			this.listeners[type] = [{{type : type, callback : callback, scope : scope}}]
		}
	},

	emit : function(type, event){

		if(this.listeners[type] != 'undefined'){
			this.listeners[type].forEach({
				function(observers){
					observer.callback.call(observer.scope, event);
				}
			});
		}
	}
}