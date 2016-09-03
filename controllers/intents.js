var searchIntent = {
    intention: "search",
    belongsTo: (words, q) => findOne(words, ["search", "find", "searching"]),
    getData: function(words, q) {
        return { response: "on my way!", text: q };
    }
};

var _intents = [searchIntent];

var intents = {
    find: function (q) {
        var words = q.split(" ");
        var result = _intents.find(i => i.belongsTo(words, q));

        return result == undefined ?
            { intention: "not found", data: {response: "Ops!"}} :
            { intention: result.intention, data: result.getData(words, q) };
    }
};

var findOne = function (haystack, arr) {
    return arr.some(v => haystack.indexOf(v) >= 0);
};
var findAll = function (haystack, arr) {
    return arr.every(v => haystack.indexOf(v) >= 0);
};

module.exports = intents;