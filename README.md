# list-all-deps

Lists all the dependancies in a module

## Usage

```javascript
var listAllDeps = require('../');

listAllDeps('path/to/module/', function(error, results){

    console.log(results);
    /*
        -> [
            'abbott-1.1.3',
            'graceful-fs-4.1.11',
            'path-parse-1.0.5',
            'resolve-1.4.0',
            'righto-3.1.0'
        ]
    */

});

```

## options

```javascript

listAllDeps('path/to/module/', {
    dependencyTypes: [
        'dependencies',
        'optionalDependencies',
        'peerDependencies'
    ]
}, callback);

```