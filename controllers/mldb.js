var Promise = require('bluebird');
var path = require('path');
var request = Promise.promisify(require("request"));

var marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
    host: 'localhost',
    port: '6000',
    user: 'admin',
    password: 'admin',
});
var q = marklogic.queryBuilder;

db.documents.query(
    q.where(
        q.value('first_name', 'Douglas')
    )
).result(documents => {
    documents.forEach(function(document) {
        console.log(JSON.stringify(document));
    });
});

var mldb = {
    search: (words, q) => {
        return [{words: words}, {query: q}];
    }
};

module.exports = mldb;