
var window = this,
parttern = /^(?:([^\/]+?))(?:\.([^\/\.]+?))?$/i;
/**
 * 
 * name : {
 *      params: [object],
 *      callback: [object, function]
 *      hand: [object],
 *      name: [string],
 *      parent: [onject]
 * }
 * 
 */
var Subscribe = function(name, parent){
    this.name = name;
    this.parent = [];
    this.params = null;
    this.callback = function(){};
    this.hand = null;
    this.connect = 0;

    if(!_.isUndefined(parent)){
        this.parent.push(parent);
    }
};
Subscribe.prototype = {
    constructor: Subscribe,
    load: function(name, params, callback){
        if(!isString(name))
            throw new Error('The name must be a string .');
        this.name = name;
        this.params = params;
        this.callback = callback;
    },
    unload: function(){
        var self = this;
        self.connect--;
        if(self.connect <= 0 && self.hand) {
            self.hand.stop();
            _.each(self.parent, function(v){
                //v.removeSubscribe(self);
            });
            self.connect = 0;
        }
    },
    reload: function(){
        this.hand.stop();
        this.run();
    },
    run: function(){
        var self = this;
        if(!self.isReady()){
            self.hand = Meteor.subscribe(self.name, self.params, {
                onError: function(){
                    if(isObject(self.callback) && self.callback.onError)
                        self.callback.onError();
                },
                onReady: function(){
                    if(isObject(self.callback) && self.callback.onReady)
                        self.callback.onReady();
                    else if(isFunction(self.callback))
                        self.callback()
                }
            });
            Deps.autorun(function(c){
                if(self.hand.ready()){
                    _.each(self.parent, function(v){
                        v.done_();
                    });
                    c.stop();
                }
            });
        }
    },
    stop: function(){
        if(this.hand)
            return this.hand.stop();
    },
    isReady: function(){
        if(this.hand){
            return this.hand.ready();
        }
        return false;
    }
};

subscription.config({
    'Subscribe': Subscribe
});