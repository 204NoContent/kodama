var _ = require('underscore');
var fs = require('fs');
var express = require('express');
var javascriptHelper = require('../../helpers/javascript_helper');
var stylesheetHelper = require('../../helpers/stylesheet_helper');
var templateHelper = require('../../helpers/template_helper');
var imageHelper = require('../../helpers/image_helper');
var applicationHelper = require('../../helpers/application_helper');
var assets_config = JSON.parse(fs.readFileSync('config/client.json'));

exports.init = function (app) {
    var js_files = javascriptHelper.getFiles(assets_config.js_files);

    IMAGE_HASH_MAP = imageHelper.hashImagesSync('client/images');

    stylesheetHelper.compileSassSync(assets_config.css_files);

    templateHelper.createJstSync('client/javascripts/templates');

    applicationHelper.portSync('client/fonts', 'public/fonts');

    stylesheetHelper.minify('client/stylesheets/system/application.css', function (hashed_file) {
        app.locals.minifiedCss = hashed_file.replace('public/', '/');
    });

    javascriptHelper.minify(js_files, function (hashed_file) {
        app.locals.minifiedJs = hashed_file.replace('public/', '/');
    });

    app.locals._ = _;
    app.locals.imageTag = applicationHelper.imageTag;
    app.locals.imageUrl = applicationHelper.imageUrl;

    app.use(express.static('public', __dirname + '/public'));
};