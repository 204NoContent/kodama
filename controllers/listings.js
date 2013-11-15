// if you change this file you need to restart the server
var fs = require('fs');
var request = require('request');
var application_config = JSON.parse(fs.readFileSync('config/application.json'));

function options(req) {
    return {
        url: 'http://YOUR_DOMAIN/api' + req.path,
        qs: req.query,
        headers: {
            // // Insert authenication headers as needed
            // 'X-YOUR-API-Version': application_config.api.version,
            // 'X-YOUR-API-Key': application_config.api.key
        },
        json: true
    };
}

// preload data from api before response
exports.show = function (req, res) {
    request(options(req), function (error, response, data) {
        res.render('listings/show', { title: 'Kodama | listing ' + req.params.id, controller: 'listings', action: 'show', data: data });
    });
};

// preload data from api before response
exports.index = function (req, res) {
    request(options(req), function (error, response, data) {
        res.render('listings/show', { title: 'Kodama | listings', controller: 'listings', action: 'index', data: data });
    });
};
