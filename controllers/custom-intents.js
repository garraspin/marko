var mldb = require('./mldb');

var findOne = (haystack, arr) => arr.some(v => haystack.indexOf(v) >= 0);
var findAll = (haystack, arr) => arr.every(v => haystack.indexOf(v) >= 0);

var searchIntent = {
    belongsTo: (words, q) => findOne(words, ["search", "find", "searching"]),
    getData: function(words, q) {
        return { response: "I will search for that right away!", searchResults: mldb.search(words, q) };
    }
};

var saluteIntent = {
    belongsTo: (words, q) => findAll(words, ["how", "are", "you"]),
    getData: function(words, q) {
        return { response: "I'm fine. Thanks!" };
    }
};

var customIntents = [searchIntent, saluteIntent];

module.exports = customIntents;