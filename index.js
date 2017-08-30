var path = require('path');
var fs = require('graceful-fs');
var righto = require('righto');
var resolve = require('resolve');

function addDep(deps, module, version, options, callback){
    var packageJsonPath = righto(resolve, module + '/package.json', {
        basedir: process.cwd(),
        readFile: fs.readFile
    });

    var added = packageJsonPath.get(function(packageJsonPath){
        var subDepPackageJson = require(packageJsonPath);
        var key = subDepPackageJson.name + '-' + subDepPackageJson.version;
        if(key in deps){
            return;
        }

        deps[key] = true;

        return righto(listModuleDeps, deps, path.resolve(packageJsonPath, '../'), options);
    });

    added(callback);
}

function addDeps(deps, modules, options, callback){
    if(!modules){
        return callback();
    }

    var added = righto.all(Object.keys(modules).map(function(key){
        return righto(addDep, deps, key, modules[key], options);
    }));

    added(callback);
}

function listModuleDeps(deps, modulePath, options, callback){

    var packageJson = require(path.join(modulePath, './package.json'));

    var complete = righto.all(options.dependencyTypes.map(function(type){
        if(!(type in packageJson)){
            return;
        }
        return righto(addDeps, deps, packageJson[type], options);
    }));

    var results = righto.mate(deps, righto.after(complete));

    results(callback);
}

module.exports = function(modulePath, options, callback){
    if(arguments.length < 3){
        callback = options;
        options = {};
    }

    options.dependencyTypes = options.dependencyTypes || ['dependencies'];

    listModuleDeps({}, modulePath, options, function(error, results){
        if(error){
            return callback(error);
        }

        callback(null, Object.keys(results));
    });
};