if (Meteor.isClient) {
    var ManagerSubscribe = subscription.get('ManagerSubscribe');

    Tinytest.add('ManagerSubscribe - Client', function(testTiny){
        var ms = new ManagerSubscribe();
        ms.load('gameRooms', {author: 'Douglas Crockford'}, function(){
            testTiny.equal((GameRooms.find({author: 'Douglas Crockford'}).count() == 1), true, "expected true1");
        });
        var e = ms.load('gameRooms', {author: 'Douglas Crockford'}, function(){
            testTiny.equal((GameRooms.find({author: 'Douglas Crockford'}).count() == 1), true, "expected true2");
        });
        testTiny.equal(e, true, "expected true"); 
        testTiny.equal(ms.isReady(), false, "expected false");

        var count = 0, before = 0;
        ms.before = function(){
            before ++;
        };
        ms.ready(function(){
            count ++;
        });
        ms.ready(function(){
            count ++;
        });
        ms.after = function(){
            testTiny.equal(count, 2, "expected 2");
            testTiny.equal(before, 1, "expected 1");
        };

        ms.run();

        //ms.unload('gameRooms');
        ms.reload('gameRooms');
    });
}