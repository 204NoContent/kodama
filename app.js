var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var engine = require('ejs-locals');

var development = require('./config/environments/development');
var production = require('./config/environments/production');

var routes = require('./routes.js');

app.set('ipaddr', '127.0.0.1');
app.set('port', 8888);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
// app.enable('trust proxy'); // trust X-Forwarded-* when behind nginx
app.enable('strict routing');
app.use(express.bodyParser());
app.use(express.methodOverride());

if (app.get('env') === 'production') {
    production.init(app);
} else {
    development.init(app);
    app.use(function (req, res, next) { development.refresh(req, res, next, app); });
}

routes.route(app);

// TODO: add request logging

// if path/ falls through, remove mistaken trailing slash
app.use(function (req, res, next) {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

server.listen(app.get('port'), app.get('ipaddr'), function () {
    console.log('Serving ' + app.get('ipaddr') + ':' + app.get('port') + ' in ' + app.get('env') + ' mode');
});
