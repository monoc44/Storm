var expect = require('chai').expect;
var nodeQ = require('../backend/nodeQueries');

describe("get nodes", function () {

    var nodes;

    before(function (done) {
        nodeQ.clearAll()
            .then(nodeQ.seedsNodes())
            .then(nodeQ.findAll())
            .then(function (data) {
                nodes = data;
                done();
            });
    });

    it("should not be empty since nodes table is cleared and seeded again", function () {
        expect(nodes.rows).to.be.at.least(1);
    });
});
