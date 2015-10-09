var express = require('express');

var routes = function (dbClient, app) {

    var router = express.Router();

    var nodeService = require('../backend/node-data')(dbClient);

    router.route('/:nodeId')
        .get(function (req, res) {
            send(res, 200, nodeService.findById(req.params.nodeId));
        })
        .delete(function (req, res) {
            send(res, 200, nodeService.remove(req.params.nodeId));
        });

    router.route('/')
        .get(function (req, res) {
            var promise = req.query.name ? nodeService.findByName(req.query.name) : nodeService.findAll();
            send(res, 200, promise);
        })
        .post(function (req, res) {
            send(res, 201, nodeService.insert(req.body));
        });

    app.use('/api/node', router);
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

