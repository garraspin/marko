var mldb = require('./mldb');
var Promise = require('bluebird');
var findOne = require('./arrayUtils').findOne;
var findAll = require('./arrayUtils').findAll;

var searchIntent = {
    belongsTo: (words, q) => findOne(words, ["search", "find", "searching"]),
    getData: (words, q) => {
        return mldb.search(words, q).then(rs => ({
            response: "I will search for that right away!",
            searchResults: rs.map(r => r.content)
        }));
    }
};

var saluteIntent = {
    belongsTo: (words, q) => findAll(words, ["how", "are", "you"]),
    getData: (words, q) => Promise.resolve({ response: "I'm fine. Thanks!" })
};

// searchIntent.getData(["okay", "michael", "search", "women"], "").then(rs => console.log(rs));
// saluteIntent.getData(["hello","how","are","you"], "hello how are you").then(rs => console.log(rs));

var customIntents = [searchIntent, saluteIntent];

module.exports = customIntents;