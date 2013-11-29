var List = subscription.get('List');
Tinytest.add('List - Valid', function(testTiny){
    var li = new List();
    li.set('key1', 'value1')
    testTiny.equal(li.get('key1'), 'value1', "expected 'value'");
    li.set('key2', 'value2')
    testTiny.equal(li.get('key2'), 'value2', "expected 'value'");
    li.set('key3', 'value3')
    testTiny.equal(li.get('key3'), 'value3', "expected 'value'");
    li.delete('key3')
    testTiny.equal(_.isNull(li.get('key3')), true, "expected ");
    li.delete()
    testTiny.equal(_.isNull(li.get('key1')), true, "expected undefined");
    testTiny.equal(_.isNull(li.get('key2')), true, "expected undefined");
});

Tinytest.add('List - Invalid', function(testTiny){
    var li = new List();
    try {
        li.set(null, 'value1');
    } catch(e) {
        testTiny.equal(e.message, 'The name must be a string .', "expected message");
    }
    li.set('key2', 'value2')
    try {
        li.set('key2', 'value2')
    } catch(e) {
        testTiny.equal(e.message, 'The name already exists .', "expected message");
    }
    li.set('key2', 'value23', true)
    testTiny.equal(li.get('key2'), 'value23', "expected 'value'");

    try {
        li.get([])
    } catch(e) {
        testTiny.equal(e.message, 'The name must be a string .', "expected message");
    }
});