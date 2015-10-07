var client = require('./client');

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
var insert = function (params, handler) {
    client.execute(
        'INSERT INTO node (id, parent_id, name, created) VALUES (uuid(), ?, ?, dateof(now()))',
        [params.parent_id, params.name], {consistency: 'types.consistencies.quorum'}, handler);
};

/* DELETE queries */
var remove = function (id, handler) {
    client.execute(
        'DELETE FROM node WHERE id = ?', [id], {consistency: 'types.consistencies.quorum'}, handler
    );
};

/* Module exports */
module.exports.findById = findById;
module.exports.findByParentId = findByParentId;
module.exports.findAll = findAll;
module.exports.findByName = findByName;
module.exports.insert = insert;
module.exports.remove = remove;