<h1>
<a name="flat-ui-free-21" class="anchor" href="#flat-ui-free-21">
<span class="octicon octicon-link"></span>
</a>
QUICK START
</h1>

<div class="highlight highlight-js">
<pre>
	ms = new ManagerSubscribe();
 	ms.load('books', {author: 'Douglas Crockford'}, function(){
        console.log('1. Run if books subscription is successful');
    });
    ms.load('items', null, function(){
        console.log('1. Run if items subscription is successful');
    });
    ms.before = function(){
        console.log('1. Run before all subscription are done');
    };
    ms.ready(function(){
        console.log('1.1 Run when all subscription are done');
    });
    ms.ready(function(){
        console.log('1.2 Run when all subscription are done');
    });
    ms.after = function(){
        console.log('after');
    };
    handQuery = function(document){
        console.log(document, 'added');
    }
    ms.on('Books.added', {author: 'Douglas Crockford'}, handQuery);
    ms.run();
</pre>
</div>
