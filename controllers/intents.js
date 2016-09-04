var searchIntent = {
    belongsTo: (words, q) => findOne(words, ["search", "find", "searching"]),
    getData: function(words, q) {
        return { response: "I will search for that right away!", searchResults: q };
    }
};
var saluteIntent = {
    belongsTo: (words, q) => findAll(words, ["how", "are", "you"]),
    getData: function(words, q) {
        return { response: "I'm fine. Thanks!" };
    }
};

var _intents = [searchIntent, saluteIntent];

var intents = {
    find: function (q) {
        var words = q.split(" ");
        var result = _intents.find(i => i.belongsTo(words, q));
        return result == undefined ?
            { response: "Ops! I didn't understand that." } :
            result.getData(words, q);
    }
};

var findOne = function (haystack, arr) {
    return arr.some(v => haystack.indexOf(v) >= 0);
};
var findAll = function (haystack, arr) {
    return arr.every(v => haystack.indexOf(v) >= 0);
};

module.exports = intents;