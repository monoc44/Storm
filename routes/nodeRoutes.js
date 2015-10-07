var express = require('express'),
    nodeQ = require('../backend/nodeQueries');

var routes = function () {

    var router = express.Router();


    router.use('/:nodeId', function (req, res, next) {
        nodeQ.findById(req.params.nodeId, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                req.node = result.rows[0];
                next();
            }
        });
    });

    router.route('/:nodeId')
        .get(function (req, res) {
            res.json(req.node);
        })
        .delete(function (req, res) {
            nodeQ.remove(req.params.nodeId, function (err) {
                if (err) throw err;
                return res.sendStatus(200);
            })
        });

    router.route('/')

        .get(function (req, res) {
            var handler = function (err, result) {
                if (err) throw err;
                if (result.rowLength > 0) {
                    return res.json(result.rows);
                } else {
                    return res.sendStatus(404)
                }
            };

            if (req.query.name) {
                nodeQ.findByName(req.query.name, handler);
            } else {
                nodeQ.findAll(handler);
            }

        })
        .post(function (req, res) {
            nodeQ.insert(req.body, function (err) {
                if (err) throw err;
                res.sendStatus(201);
            });
        });

    return router;
};

module.exports = routes;

