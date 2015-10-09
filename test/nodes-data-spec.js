var expect = require('chai').expect;

var dbClient = require('../backend/client-db');
var nodeService = require('../backend/node-data')(dbClient);

var seeds = function () {
    require('../backend/node-data').seedsForTests(dbClient);
};

describe("[BACKEND] get nodes", function () {

    var nodes;

    before(function (done) {
        nodeService.clearAll()
            .then(seeds(dbClient))
            .then(nodeService.findAll())
            .then(function (data) {
                nodes = data;
                done();
            });
    });

    it("should not be empty since nodes table is cleared and seeded again", function () {
        expect(nodes.rows).to.be.at.least(1);
    });
});

describe("[BACKEND] save node", function () {
    it("should check parent id exists in DB");
});