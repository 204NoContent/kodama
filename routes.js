// if you change this file you need to restart the server
var fs = require('fs');
var request = require('request');
var application_config = JSON.parse(fs.readFileSync('config/application.json'));

var pages = require('./controllers/pages');
var listings = require('./controllers/listings');

exports.route = function (app) {
    app.get('/api/*', function (req, res) {
        // // Insert authenication headers as needed
        // req.headers['X-YOUR-API-Version'] = application_config.api.version;
        // req.headers['X-YOUR-API-Key'] = application_config.api.key;
        req.pipe(request('http://YOUR_DOMAIN' + req.url)).pipe(res);
    });

    app.get('/', pages.index);
    app.get('/about', pages.about);
    app.get('/trains', pages.trains);
    app.get('/listings/:id', listings.show);
    app.get('/listings', listings.index);
};
