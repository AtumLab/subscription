Tinytest.add('Utils - Function', function(testTiny){
    var e;
    // Try some invalid
    [
        'foo@bar.com', //string
        {}, //object,
        [], //array
        123, //number
        true, //boolean
        null,
        undefined
    ].forEach(function(value) {
        e = isFunction(value);
        testTiny.equal(e, false, "expected false , value : " + value);
    });
    e = isFunction(function(){});
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Utils - Array', function(testTiny){
    var e;
    // Try some invalid
    [
        'foo@bar.com', //string
        {}, //object,
        function(){}, //function
        123, //number
        true, //boolean
        null,
        undefined
    ].forEach(function(value) {
        e = isArray(value);
        testTiny.equal(e, false, "expected false , value : " + value);
    });
    e = isArray([]);
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Utils - String', function(testTiny){
    var e;
    // Try some invalid
    [
        [], //array
        {}, //object,
        function(){}, //function
        123, //number
        true, //boolean
        null,
        undefined
    ].forEach(function(value) {
        e = isString(value);
        testTiny.equal(e, false, "expected false , value : " + value);
    });
    e = isString('foo@bar.com');
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Utils - Object', function(testTiny){
    var e;
    // Try some invalid
    [
        'foo@bar.com', //string
        function(){}, //function
        123, //number
        true, //boolean
        null,
        undefined
    ].forEach(function(value) {
        e = isObject(value);
        testTiny.equal(e, false, "expected false , value : " + value);
    });
    e = isObject({});
    testTiny.equal(e, true, "expected true");
    e = isObject([]);
    testTiny.equal(e, true, "expected true");
});

Tinytest.add('Utils - Equals', function(testTiny){
    
    e = equals({}, {});
    testTiny.equal(e, true, "expected true");
    e = equals([], []);
    testTiny.equal(e, true, "expected true");
    e = equals({le: 'hoang'}, {le: 'hoang'});
    testTiny.equal(e, true, "expected true");

    e = equals({hoang: 'hoang'}, {le: 'hoang'});
    testTiny.equal(e, false, "expected false");
});