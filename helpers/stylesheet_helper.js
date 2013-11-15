var _ = require('underscore');
var sass = require('node-sass');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var path = require('path');
var wrench = require('wrench');
var compressor = require('node-minify');
var applicationHelper = require('./application_helper');
var ejs = require('ejs');

exports.compileSassSync = function (items) {
    // TODO: npm version of sass may be outdated... check filter:alpha(opacity=30);
    items = items || [];
    items = _.map(items, function (file) { return 'client/stylesheets/' + file; });
    var all_files = [];
    var new_files;
    var output_file_path = 'client/stylesheets/system/';
    var output_file_basename = 'application';
    var temp_file_path = 'tmp/';
    var valid_css_types = ['.css', '.scss'];

    mkdirp.sync(output_file_path);

    var all_scss_for_ejs = _.map(wrench.readdirSyncRecursive('client/stylesheets'), function (result) { return 'client/stylesheets/' + result; });
    all_scss_for_ejs = _.select(all_scss_for_ejs, function (file) { return (path.extname(file) === '.scss'); });

    _.each(all_scss_for_ejs, function (scss_file) {
        var processed_file = ejs.render(fs.readFileSync(scss_file).toString(), { imageUrl: applicationHelper.imageUrl,  imageTag: applicationHelper.imageTag });
        var temp_scss_file = scss_file.replace(/^client\//, temp_file_path);
        mkdirp.sync(path.dirname(temp_scss_file));
        fs.writeFileSync(temp_scss_file, processed_file);
    });

    _.each(items, function (item) {
        if (_.include(valid_css_types, path.extname(item))) {
            all_files.push(item);
        } else if (path.extname(item) === '') {
            if (fs.existsSync(item)) {
                new_files = _.filter(wrench.readdirSyncRecursive(item), function (result) { return _.include(valid_css_types, path.extname(result)); });
                all_files = all_files.concat(_.map(new_files, function (new_file) {  return item + '/' + new_file; }));
            }
        }
    });

    fs.writeFileSync(temp_file_path + output_file_basename + '.scss', '/* Css compiled from your scss. */\n/* Do not change this file directly */');
    _.each(all_files, function (file) {
        fs.appendFileSync(temp_file_path + output_file_basename + '.scss', fs.readFileSync(file));
    });

    var compiled_css = sass.renderSync({ file: temp_file_path + output_file_basename + '.scss' });

    fs.writeFileSync(output_file_path + output_file_basename + '.css', compiled_css);
    process.nextTick(function () {
        fs.unlink(temp_file_path + output_file_basename + '.scss');
        wrench.rmdirSyncRecursive('tmp/stylesheets');
    });
};

exports.minify = function (css_file, callback) {
    var output_file = 'public/stylesheets/application.css';
    if (fs.existsSync(path.dirname(output_file))) {
        wrench.rmdirSyncRecursive(path.dirname(output_file));
    }
    mkdirp.sync(path.dirname(output_file));
    var css_comp = new compressor.minify({
        type: 'yui-css',
        fileIn: css_file,
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
