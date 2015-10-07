var client = require('./client');

var findAll = function (handler) {
    client.execute('SELECT id, name, created, parent_id FROM node', handler);
};

var findByName = function (queryFilter, handler) {
    client.execute('SELECT id, name, created, parent_id FROM node WHERE name = ?', queryFilter, handler);
};

module.exports.findAll = findAll;
module.exports.findByName = findByName;


// create table node (nodeId int primary key, name varchar, parentnodeid int);
// create index node on dev.node(name);
// insert into node (id, name, created) values (uuid(), 'second node';

