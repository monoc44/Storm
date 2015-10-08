var expect = require('chai').expect;
var client = require('../backend/client');
var nodeQ = require('../backend/nodeQueries');
var Promise = require('bluebird');

var connectDB = Promise.promisify(client.connect, client);

Promise.onPossiblyUnhandledRejection(function (error) {
    throw error;
});

describe("get nodes", function () {
    it("should not be empty since nodes table is cleared and seeded again", function (done) {
        connectDB()
            .then(nodeQ.clearAll())
            .then(nodeQ.seedsNodes())
            .then(nodeQ.findAll())
            .then(function (result, err) {
                console.log(result);
                console.log(err);
                expect(result.rows.length).to.be.at.least(1);
                done();
            });
    });
});
