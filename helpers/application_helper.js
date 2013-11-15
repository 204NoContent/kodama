var fs = require('graceful-fs');
var crypto = require('crypto');
var path = require('path');
var wrench = require('wrench');

exports.imageUrl = function (local_image_path) {
    local_image_path = 'images/' + local_image_path;
    return '/' + ('production' === process.env.NODE_ENV ? IMAGE_HASH_MAP[local_image_path] : local_image_path);
};

exports.imageTag = function (local_image_path, options) {
    options = options || {};
    return '<img '
        + (options.id ? 'id=' + '"' + options.id + '"' : '')
        + (options['class'] ? 'class=' + '"' + options['class'] + '"' : '')
        + 'src=' + '"' + this.imageUrl(local_image_path) + '"'
        + 'src=' + '"' + this.imageUrl(local_image_path) + '"'
        + 'alt=' + '"' + path.basename(local_image_path, path.extname(local_image_path)) + '"'
        + '>';
};

exports.fileHash = function (file, callback) {
    var md5sum = crypto.createHash('md5');
    var filestream = fs.ReadStream(file);
    filestream.on('data', function (data) {
        md5sum.update(data);
    });

    filestream.on('end', function () {
        callback(md5sum.digest('hex'));
    });
};

exports.fileHashSync = function (file) {
    var md5sum = crypto.createHash('md5');
    var file_data = fs.readFileSync(file);

    md5sum.read(file_data);

    return md5sum.digest('hex');
};

exports.portSync = function (source, destination) {
    wrench.copyDirSyncRecursive(source, destination, { forceDelete: true, excludeHiddenUnix: true, preserveFiles: false });
};
