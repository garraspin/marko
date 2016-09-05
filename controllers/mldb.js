var marklogic = require('marklogic');

var db = marklogic.createDatabaseClient({
    host: 'localhost',
    port: '6000',
    user: 'admin',
    password: 'admin',
});
var queryBuilder = marklogic.queryBuilder;

var mldb = {
    search: (words, q) => {
        return db.documents.query(
            queryBuilder.where(
                queryBuilder.value('first_name', 'Douglas')
            )
        ).result();
    }
};

module.exports = mldb;