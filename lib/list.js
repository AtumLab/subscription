/**
 * 
 * 
 * @constructor
 * @extends {}
 */
var List = function(){
    var list_ = {};
    this.set = function(name, value, force){
        if(!isString(name))
            throw new Error('The name must be a string .');
        if(list_[name] && !force)
            throw new Error('The name already exists .');
        list_[name] = value;
    };
    this.get = function(name){
        if(_.isUndefined(name))
            return list_;
        if(!isString(name))
            throw new Error('The name must be a string .');
        if(list_[name])
            return list_[name];
        return null;
    };
    this.delete = function(name){
        if(_.isUndefined(name)){
            list_ = {};
            return;
        }
        if(!isString(name))
            throw new Error('The name must be a string .');
        list_[name] = null;
    };
};
subscription.config({
    'List': List
});