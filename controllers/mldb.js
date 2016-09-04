var Promise = require('bluebird');
var path = require('path');
var request = Promise.promisify(require("request"));


var marklogic = require('marklogic');

var mlClient = marklogic.createDatabaseClient({
    host: 'localhost',
    port: '6000',
    user: 'admin',
    password: 'admin',
});
var queryBuilder = marklogic.queryBuilder;


var mldb = {
    client: mlClient,
    queryBuilder: queryBuilder
};

module.exports = mldb;