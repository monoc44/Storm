var expect = require('chai').expect;
var request = require('supertest');

var express = require('express');
var app = express();

var savedNode;
var nodeToSave = {name: "nodeToSave"};

var dbClient;
require('../routes/node-routes')(dbClient, app);

describe("[SERVICE] save nodes", function () {

    it("should validate that name is not empty");
    it("should validate that name is less than 100 characters");

    it("should pass the node to the db save", function (done) {
        request(app).post("/api/nodes").send(nodeToSave).end(function (err, res) {
            expect(savedNode).to.deep.equal(nodeToSave);
            done();
        });
    });
    it("should return a status 200 to frontend if job is successfully saved");
    it("should return a node with its new id");
    it("should return an error if the database failed");

});
