var VALID_KEYS = [
    'List',
    'Subscribe',
    'ManagerSubscribe'
];
subscription = {};
subscription._options = {};
/**
 * 
 * @param {object} options
 * @return {null}
 */
subscription.config = function(options) {
    _.each(_.keys(options), function (key) {
        if (!_.contains(VALID_KEYS, key)) {
            throw new Error("Invalid key: " + key);
        }
    });
    // set values in subscription._options
    _.each(VALID_KEYS, function (key) {
        if (key in options) {
            if (key in subscription._options) {
                throw new Error("Can't set `" + key + "` more than once");
            } 
            else {
                subscription._options[key] = options[key];
            }
        }
    });
}
/**
 * 
 * @param {string} key
 * @return {object}
 */
subscription.get = function(key) {
    if(this._options[key])
        return this._options[key];
    throw new Error("Validation.get: Invalid key: " + key);
}