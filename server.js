var express = require('express');
var app = express();

var clientDb = require('./backend/client-db');
require('./routes/node-routes')(clientDb, app);

/* Body parsers */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Static pages */
app.use(express.static(__dirname + '/public'));

/* Views */
app.set('views', './views');
app.set('view engine', 'jade');

/* Root views */
app.get('*', function (req, res) {
    res.render('index');
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Server running on port: ' + port);
});