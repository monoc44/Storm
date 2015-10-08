var client = require('./client'),
    Promise = require('bluebird');

/* FIND queries */
var findAll = function (handler) {
    client.execute('SELECT id, parent_id, name, created FROM node', handler);
};
var findById = function (id, handler) {
    client.execute('SELECT id, parent_id, name, created FROM node WHERE id = ?', [id], handler);
};
var findByParentId = function (parentId, handler) {
    client.execute('SELECT id, parent_id, name, created FROM node WHERE parent_id = ?', [parentId], handler);
};
var findByName = function (name, handler) {
    client.execute('SELECT id, parent_id, name, created FROM node WHERE name = ?', [name], handler);
};

/* INSERT queries */
var insert = function (params) {
    return new Promise(function (resolve, reject) {
        client.execute(
            'INSERT INTO node (id, parent_id, name, created) VALUES (uuid(), ?, ?, dateof(now()))',
            [params.parent_id, params.name], {consistency: 'types.consistencies.quorum'}, function (err) {
                if (err) reject;
                resolve;
            });
    });

};

/* DELETE queries */
var remove = function (id, handler) {
    client.execute(
        'DELETE FROM node WHERE id = ?', [id], {consistency: 'types.consistencies.quorum'}, handler
    );
};

var clearAll = function () {
    return new Promise(function (resolve, reject) {
        client.execute('TRUNCATE node', {consistency: 'types.consistencies.quorum'}, function (err) {
            if (err) reject;
            resolve;
        });
    });
};

var seedsNodes = function () {
    return new Promise(function (resolve, reject) {
        insert({name: 'node1'})
            .then(insert({name: 'node2'}))
            .then(insert({name: 'node3'}))
            .then(insert({name: 'node4'}))
            .then(resolve)
            .catch(function (error) {
                console.log(error);
                reject;
            });
    });
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