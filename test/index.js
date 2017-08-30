var test = require('tape');
var listAllDeps = require('../');
var path = require('path');

test('works', function(t){
    t.plan(2);

    listAllDeps(path.resolve(__dirname, '../'), function(error, result){
        t.notOk(error);
        t.deepEqual(result.sort(), [
            'abbott-1.1.3',
            'graceful-fs-4.1.11',
            'path-parse-1.0.5',
            'resolve-1.4.0',
            'righto-3.1.0'
        ]);
    });
});