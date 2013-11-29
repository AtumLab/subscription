/**
 * 
 * @stable
 */
isString = function(obj){
    return (Object.prototype.toString.call(obj) == '[object String]');
};
isArray = function(val) {
    if(val === null)
        return false;
    if(val === undefined)
        return false;
    return val &&
        typeof(val) === 'object' &&
        typeof(val.length) === 'number' &&
        typeof(val.splice) === 'function' &&
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable
        !(val.propertyIsEnumerable('length'));
};
isFunction = function(obj){
    return (Object.prototype.toString.call(obj) == '[object Function]');
};
isObject = function(value){
    return value !== null && typeof value === 'object';
};
// @Angular.js
isDate = function (value){
    return toString.apply(value) == '[object Date]';
};
isRegExp = function (value) {
    return toString.apply(value) == '[object RegExp]';
};
equals = function (o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
        if (t1 == 'object') {
            if (isArray(o1)) {
                if (!isArray(o2)) return false;
                if ((length = o1.length) == o2.length) {
                    for(key=0; key < length; key++) {
                        if (!equals(o1[key], o2[key])) return false;
                    }
                    return true;
                }
            } else if (isDate(o1)) {
                return isDate(o2) && o1.getTime() == o2.getTime();
            } else if (isRegExp(o1) && isRegExp(o2)) {
                return o1.toString() == o2.toString();
            } else {
                keySet = {};
                for(key in o1) {
                    if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
                    if (!equals(o1[key], o2[key])) return false;
                    keySet[key] = true;
                }
                for(key in o2) {
                if (!keySet.hasOwnProperty(key) &&
                    key.charAt(0) !== '$' &&
                    o2[key] !== undefined &&
                    !isFunction(o2[key])) return false;
                }
                return true;
            }
        }
    }
    return false;
};