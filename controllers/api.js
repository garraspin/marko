var intents = require("./intents");

var api = {
    search : function(req, res, next) {
        const q = req.param("q");
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(intents.find(q)));
    }
};

module.exports = api;