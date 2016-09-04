// Bulk load JSON documents from a folder on the file system.
"use strict";

var marklogic = require("marklogic");
var path = require('path');
var fs = require("fs");

var dbConn = {
    host: 'localhost',
    port: 6000,
    user: 'admin',
    password: 'admin',
};

var dbWrite = marklogic.createDatabaseClient(dbConn);
var directory = path.join(__dirname, 'data');
var batchSize = 1;
var iterator = 0;

function readFile(files, counter, buffer, isLast) {
    var file = files[counter];
    fs.readFile(path.join(directory, file), function (err, content) {
        if (err) {
            throw err;
        }

        var lines = content.toString().split('\n');
        var fileName = file.split('.')[0];

        lines.forEach(line => {
            var person = JSON.parse(line);
            buffer.push({
                uri: "/" + fileName + "/" + person.id,
                contentType: "application/json",
                content: person
            });
        });

        if (isLast) {
            console.log('loading batch from ' + buffer[0].uri + ' to ' + file);
            dbWrite.documents.write(buffer).result().then(response => {
                response.documents.map(document => {
                    iterator++;
                    console.log('Inserted ' + document.uri)
                });

                writeBatch(files, counter + 1);
            }).catch(function (error) {
                console.log(error);
            });
        }
    });
}

function writeBatch(files, batchFirst) {
    // if all batches have been inserted
    if (batchFirst >= files.length) {
        console.log('Found ' + files.length + ' files, loaded ' + iterator);
        return;
    }

    var batchLast = Math.min(batchFirst + batchSize, files.length) - 1;

    var buffer = [];
    for (var i = batchFirst; i <= batchLast; i++) {
        readFile(files, i, buffer, i === batchLast);
    }
}

fs.readdir(directory, function (err, files) {
    if (err) {
        console.log(err);
    }

    var filteredFiles = files.filter((file) => file.match(/\.json$/));
    writeBatch(filteredFiles, 0);
});
