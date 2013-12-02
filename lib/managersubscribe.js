/**
 * 
 * 
 * @constructor
 * @extends {}
 */
var Subscribe = subscription.get('Subscribe'),
List = subscription.get('List');

var subscribeList_ = new List();
var ManagerSubscribe = function(){
    var self = this;
    
    self.readyList = [];
    self.onList_ = [];
    self.listSubscribe_ = new List();

    self.isFirst = false;
    self.callback = new List();

};
ManagerSubscribe.prototype = {
    constructor: ManagerSubscribe,
    
    on: function(eventString, params, func){
        if(!isString(eventString))
            throw new Error('The eventString must be a string .');
        if(isFunction(params)){
            func = params;
            params = null;
        }
        if(!isFunction(func))
            throw new Error('The func must be a function .');
        var events = eventString.match(parttern),
        collection = events[1],
        event = events[2],
        ob = {},
        queryHandle;
        ob[event] = func;
        if(params)
            queryHandle = window[collection].find(params).observe(ob);
        else
            queryHandle = window[collection].find().observe(ob);
        this.onList_.push({
            func: func,
            query: queryHandle
        });
    },
    off: function(func){
        if(!isFunction(func))
            throw new Error('The func must be a function .');
        _.each(this.onList_, function(v, k){
            if(v.func === func){
                v.query.stop();
                this.onList_.splice(k, 1);
            };
        }, this);
    },

    done_: function(){
        var self = this;
        self.runCallback();
        if(self.isReady()){
            _.each(self.readyList, function(v, k){
                v();
            });
            self.after();
        }
    },

    before: function(){},
    after: function(){},

    // http://docs.meteor.com/#meteor_subscribe
    load: function(name, params, callback){
        if(!isString(name))
            throw new Error('The name must be a string .');
        var self = this,
        newSubscribe = new Subscribe(name, self),
        result = false;
        newSubscribe.load(name, params);
        _.each(subscribeList_.get(), function(v){
            if(isObject(v) && v.name === newSubscribe.name && equals(v.params, newSubscribe.params)){
                //exists
                result = true;
            }
        });
        if(!result){
            subscribeList_.set(name, newSubscribe);
            self.listSubscribe_.set(name, newSubscribe);
            newSubscribe.connect ++ ;
        }
        self.callback.set(name, {callback: callback, isRun: false}, true);
        return result;
    },

    run: function(){
        var self = this;
        if (!self.isFirst) {
            self.before();
            self.isFirst = true;
        };
        _.each(self.listSubscribe_.get(), function(v, k){
            // not deleted by unload
            if(v !== null)
                v.run();
        }, self);
    },
    unload: function(name){
        var self = this;
        if(_.isUndefined(name)) {
            _.each(self.listSubscribe_.get(), function(hand, k){
                // not deleted by unload
                if(hand !== null){
                    hand.unload();
                    self.listSubscribe_.delete(name);
                }
            }, self);
            return;
        }
        if(!isString(name))
            throw new Error('The name must be a string .');
        
        var hand = self.listSubscribe_.get(name);
        if(hand !== null){
            hand.unload();
            self.listSubscribe_.delete(name);
        }
    },
    reload: function(){
        if(this.listSubscribe_.get(name))
            this.listSubscribe_.get(name).reload();
    },
    ready: function(func){
        if(!isFunction(func)){
            throw new Error('The params must be a function .');
        }
        this.readyList.push(func);
    },
    isReady: function(){
        return _.all(this.listSubscribe_.get(), function (handle) {
            return handle.isReady();
        });
    },
    runCallback: function(){
        _.each(this.callback.get(), function(v, k){
            if(this.listSubscribe_.get(k) && this.listSubscribe_.get(k).isReady() && !v.isRun){
                v.callback();
                v.isRun = true;
            }
        }, this);
    }
};

//global
subscription.config({
    'ManagerSubscribe': ManagerSubscribe
});