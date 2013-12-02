/**
 * 
 *
 * Copyright 2013 Hoang Le <particle4dev@gmail.com>
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
// meteor test-packages ./
Package.describe({
    summary: "Subscription",
    author: "Hoang Le <particle4dev@gmail.com>"
});

var both = ["client", "server"],
client = "client",
server = "server";

Package.on_use(function (api) {

    // depend packages
    api.use(["underscore"], both);
    
    api.add_files([

    ], both);
    api.add_files([
        'lib/_boot.js',
        'lib/utils.js',
        'lib/list.js',
        'lib/subscribe.js',
        'lib/managersubscribe.js',
        'lib/exports.js'
    ], client);
    api.add_files([

    ], server);

    if (typeof api.export !== 'undefined') {
        api.export('subscription', client, {testOnly: true});
        api.export('isFunction', client, {testOnly: true});
        api.export('isArray', client, {testOnly: true});
        api.export('isString', client, {testOnly: true});
        api.export('isObject', client, {testOnly: true});
        api.export('equals', client, {testOnly: true});
        api.export('ManagerSubscribe', client);
    }
});

Package.on_test(function (api) {
  	api.use(['subscription', 'tinytest', 'test-helpers', 'reactive-dict'], both);
    api.add_files('test/utils.js', client);
    api.add_files('test/list.js', client);
    api.add_files('test/subscribe.js', both);
    api.add_files('test/managersubscribe.js', both);
});