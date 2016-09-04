
var _intents = require('./custom-intents');

var intents = {
    find: function (q) {
        var words = q.split(" ");
        var result = _intents.find(i => i.belongsTo(words, q));
        return result == undefined ?
            { response: "Ops! I didn't understand that." } :
            result.getData(words, q);
    }
};

module.exports = intents;