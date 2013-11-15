// if you change this file you need to restart the server
var fs = require('fs');
var trains = JSON.parse(fs.readFileSync('data/trains.json'));

exports.index = function (req, res) {
    res.render('pages/index', { title: 'Kodama', controller: 'pages', action: 'index', greetings: ['Hi', 'Hello', 'Howdy'] });
};

exports.about = function (req, res) {
    res.render('pages/about', { title: 'Kodama | About', controller: 'pages', action: 'about' });
};

// preload data from api before response
exports.trains = function (req, res) {
    res.render('pages/trains', { title: 'Kodama | trains', controller: 'pages', action: 'trains', data: trains });
};
