var expect = require('chai').expect;
var client = require('../backend/client');
var nodeQ = require('../backend/nodeQueries');
var Promise = require('bluebird');

var connectDB = Promise.promisify(client.connect, client);

describe("get nodes", function () {
    it("should not be empty since nodes table are cleared and then seeded", function (done) {
        connectDB()
            .then(nodeQ.clearAll())
            .then(nodeQ.seedsNodes())
            .then(nodeQ.findAll(function (err, result) {
                expect(result.rows.length).to.be.at.least(1);
                done();
            }));
    });
});
