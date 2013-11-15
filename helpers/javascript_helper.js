var _ = require('underscore');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var path = require('path');
var wrench = require('wrench');
var compressor = require('node-minify');
var applicationHelper = require('./application_helper');

exports.getFiles = function (items) {
    items = items || [];
    var filterd_files;
    var js_files = [];
    _.each(items, function (item) {
        if (path.extname(item) === '.js') {
            js_files.push(item);
        } else {
            filterd_files = _.reject(wrench.readdirSyncRecursive('client/javascripts/' + item), function (result) { return path.extname(result) !== '.js'; });
            js_files = js_files.concat(_.map(filterd_files, function (file) { return item + '/' + file; }));
        }
    });
    return js_files;
};

exports.minify = function (js_files, callback) {
    js_files = _.map(js_files, function (file) { return 'client/javascripts/' + file; });
    var output_file = 'public/javascripts/application.js';
    if (fs.existsSync(path.dirname(output_file))) {
        wrench.rmdirSyncRecursive(path.dirname(output_file));
    }
    mkdirp.sync(path.dirname(output_file));
    var js_comp = new compressor.minify({
        type: 'yui-js',
        fileIn: js_files,
        fileOut: output_file,
        callback: function (err, min) {
            applicationHelper.fileHash(output_file, function (md5Hash) {
                var hashed_file_name = path.dirname(output_file) + '/' + path.basename(output_file, path.extname(output_file)) + '-' + md5Hash + path.extname(output_file);
                fs.rename(output_file, hashed_file_name);
                callback(hashed_file_name);
            });
        }
    });
};
