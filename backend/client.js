var cassandra = require('cassandra-driver');

var hosts = process.env.DB_HOSTS || 'localhost';
var keyspace = process.env.DB_KEYSPACE || 'dev';

console.log('Cassandra contact points: ' + hosts);
console.log('Cassandra keyspace: ' + keyspace);

var client = new cassandra.Client({
    contactPoints: [hosts],
    keyspace: keyspace
});

client.connect(function (err) {
    throw err;
});

module.exports = client;


//CREATE KEYSPACE IF NOT EXISTS dev
//WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
//
//CREATE TABLE IF NOT EXISTS node (
//    id int primary key, name varchar, parent_id int, created timestamp);
//);