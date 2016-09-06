var Promise = require('bluebird');
var _intents = require('./custom-intents');

var noIntent = { response: "Ops! I didn't understand that." };

var intents = {
    find: function (q) {
        var words = q.split(" ").map(s => s.toLowerCase());
        var result = _intents.find(i => i.belongsTo(words, q));
        return result == undefined ? Promise.resolve(noIntent) : result.getData(words, q);
    }
};

// intents.find("okay Michael can you search for women").then(rs => console.log(rs));
// intents.find("hello how are you").then(rs => console.log(rs));

module.exports = intents;