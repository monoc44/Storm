var express = require('express'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 8000;

var app = express();

/* Body parsers */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Static pages */
app.use(express.static(__dirname + '/public'));

/* Routes */
var nodeRouter = require('./routes/nodeRoutes')();
app.use('/api/node', nodeRouter);

/* Views */
app.set('views', './views');
app.set('view engine', 'jade');

/* Root views */
app.get('*', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log('Server running on port: ' + port);
});