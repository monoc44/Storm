var express = require('express');
var nodeQ = require('./backend/nodeQueries');

/* ROUTING */
var port = process.env.PORT || 8000;
var router = express.Router();

router.route('/cycle')
    .get(function (req, res) {

        var handler = function (err, result) {
            if (err) throw err;

            if (result.rowLength > 0) {
                return res.json(result);
            } else {
                return res.send("No rows found.");
            }
        };

        if (req.query.name) {
            nodeQ.findByName([req.query.name], handler);
        } else {
            nodeQ.findAll(handler);
        }

    });


/* Start SERVER */
var app = express();
app.use('/api', router);

app.listen(port, function () {
    console.log('Running on port: ' + port);
});