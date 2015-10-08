var express = require('express'),
    nodeQ = require('../backend/nodeQueries');

var routes = function () {

    var router = express.Router();

    //router.use('/:nodeId', function (req, res, next) {
    //    nodeQ.findById(req.params.nodeId)
    //        .then(function (data) {
    //            req.nodes = data;
    //            next();
    //        });
    //});

    router.route('/:nodeId')
        .get(function (req, res) {
            send(res, 200, nodeQ.findById(req.params.nodeId));
        })
        .delete(function (req, res) {
            send(res, 200, nodeQ.remove(req.params.nodeId));
        });

    router.route('/')
        .get(function (req, res) {
            var promise = req.query.name ? nodeQ.findByName(req.query.name) : nodeQ.findAll();
            send(res, 200, promise);
        })
        .post(function (req, res) {
            send(res, 201, nodeQ.insert(req.body));
        });

    return router;
};

var sendData = function (res, status, data) {
    //console.log(data);
    if (data == undefined || data.rowLength == 0) {
        return res.sendStatus(404);
    }
    return res.status(status).json(data.rows);
};

var sendError = function (res, error) {
    return res.status(500).send(error);
};

var send = function (res, status, promise) {
    promise.then(function (data) {
        sendData(res, status, data);
    }).catch(function (err) {
        sendError(res, err);
    });
};


module.exports = routes;

