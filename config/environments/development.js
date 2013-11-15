var _ = require('underscore');
var fs = require('fs');
var express = require('express');
var javascriptHelper = require('../../helpers/javascript_helper');
var stylesheetHelper = require('../../helpers/stylesheet_helper');
var templateHelper = require('../../helpers/template_helper');
var applicationHelper = require('../../helpers/application_helper');
var assets_config = JSON.parse(fs.readFileSync('config/client.json'));

exports.init = function (app) {
    stylesheetHelper.compileSassSync(assets_config.css_files);

    templateHelper.createJstSync('client/javascripts/templates');

    app.locals._ = _;
    app.locals.imageTag = applicationHelper.imageTag;
    app.locals.imageUrl = applicationHelper.imageUrl;
    app.locals.js_files = javascriptHelper.getFiles(assets_config.js_files);

    app.use(express.static('client', __dirname + '/public'));
};

exports.refresh = function (req, res, next, app) {
    if ('api' !== req.path.split('/')[1]) {
        console.log('compiling sass ...');
        stylesheetHelper.compileSassSync(assets_config.css_files);
        console.log('rendering templates ...');
        templateHelper.createJstSync('client/javascripts/templates');
        app.locals.js_files = javascriptHelper.getFiles(assets_config.js_files);
    }
    next();
};