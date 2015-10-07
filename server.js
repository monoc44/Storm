var express = require('express'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 8000;

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* Routes */
var nodeRouter = require('./routes/nodeRoutes')();
app.use('/api/node', nodeRouter);

app.listen(port, function () {
    console.log('Server running on port: ' + port);
});