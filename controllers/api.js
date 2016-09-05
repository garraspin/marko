var intents = require("./intents");

var api = {
    search : function(req, res) {
        const q = req.param("q");
        res.setHeader('Content-Type', 'application/json');
        intents.find(q).then(result => res.send(JSON.stringify(result)));
    }
};

module.exports = api;