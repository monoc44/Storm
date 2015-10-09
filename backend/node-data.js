var nodeService = function (dbClient) {
    return {

        findAll: function () {
            return dbClient.executeAsync('SELECT id, parent_id, name, created FROM node');
        },

        findById: function (id) {
            return dbClient.executeAsync('SELECT id, parent_id, name, created FROM node WHERE id = ?', [id]);
        },

        findByParentId: function (parentId) {
            return dbClient.executeAsync('SELECT id, parent_id, name, created FROM node WHERE parent_id = ?', [parentId]);
        },

        findByName: function (name) {
            return dbClient.executeAsync('SELECT id, parent_id, name, created FROM node WHERE name = ?', [name]);
        },

        insert: function (jsonBody) {
            return dbClient.executeAsync(
                'INSERT INTO node (id, parent_id, name, created) VALUES (uuid(), ?, ?, dateof(now()))',
                [jsonBody.parent_id, jsonBody.name], {consistency: 'types.consistencies.quorum'});
        },

        remove: function (id) {
            return dbClient.executeAsync('DELETE FROM node WHERE id = ?', [id], {consistency: 'types.consistencies.quorum'});
        },

        clearAll: function () {
            return dbClient.executeAsync('TRUNCATE node', {consistency: 'types.consistencies.quorum'});
        }
    }
};

var seedsForTests = function (dbClient) {
    var service = nodeService(dbClient);
    return service.insert({name: 'node1'})
        .then(service.insert({name: 'node2'}))
        .then(service.insert({name: 'node3'}))
        .then(service.insert({name: 'node4'}));
};

module.exports = nodeService;
module.exports.seedsForTests = seedsForTests;
