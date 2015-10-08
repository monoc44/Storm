var client = require('./client');

/* FIND queries */
var findAll = function () {
    return client.executeAsync('SELECT id, parent_id, name, created FROM node');
};
var findById = function (id) {
    return client.executeAsync('SELECT id, parent_id, name, created FROM node WHERE id = ?', [id]);
};
var findByParentId = function (parentId) {
    return client.executeAsync('SELECT id, parent_id, name, created FROM node WHERE parent_id = ?', [parentId]);
};
var findByName = function (name) {
    return client.executeAsync('SELECT id, parent_id, name, created FROM node WHERE name = ?', [name]);
};

/* INSERT queries */
var insert = function (params) {
    return client.executeAsync(
        'INSERT INTO node (id, parent_id, name, created) VALUES (uuid(), ?, ?, dateof(now()))',
        [params.parent_id, params.name], {consistency: 'types.consistencies.quorum'});
};

/* DELETE queries */
var remove = function (id) {
    return client.executeAsync('DELETE FROM node WHERE id = ?', [id], {consistency: 'types.consistencies.quorum'});
};

var clearAll = function () {
    return client.executeAsync('TRUNCATE node', {consistency: 'types.consistencies.quorum'});
};

/* For TEST purposes, populate node table */
var seedsNodes = function () {
    return insert({name: 'node1'})
        .then(insert({name: 'node2'}))
        .then(insert({name: 'node3'}))
        .then(insert({name: 'node4'}));
};

/* Module exports */
module.exports.findById = findById;
module.exports.findByParentId = findByParentId;
module.exports.findAll = findAll;
module.exports.findByName = findByName;
module.exports.insert = insert;
module.exports.remove = remove;
module.exports.clearAll = clearAll;
module.exports.seedsNodes = seedsNodes;