var _ = require('underscore');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var path = require('path');
var wrench = require('wrench');
var applicationHelper = require('./application_helper');

exports.hashImagesSync = function (dir) {
    var image_hash_map = {};
    var all_images = [];
    if (fs.existsSync('public/images')) {
        wrench.rmdirSyncRecursive('public/images');
    }
    all_images = _.map(wrench.readdirSyncRecursive(dir), function (result) { return dir + '/' + result; });
    all_images = _.reject(all_images, function (file) { return (path.extname(file) === '' || path.basename(file)[0] === '.'); });

    _.each(all_images, function (file) {
        var md5Hash = applicationHelper.fileHashSync(file);
        var image_path_array = path.dirname(file).split('/');
        var image_path = image_path_array.slice(image_path_array.indexOf('images')).join('/');
        var hashed_file_name = image_path + '/' + path.basename(file, path.extname(file)) + '-' + md5Hash + path.extname(file);
        image_hash_map[image_path + '/' + path.basename(file)] = hashed_file_name;
        mkdirp('public/' + image_path, function () {
            fs.createReadStream(file).pipe(fs.createWriteStream('public/' + hashed_file_name));
        });
    });
    return image_hash_map;
};
