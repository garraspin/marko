var intents = require("./intents");

var api = {
    search : function(req, res) {
        const q = req.param("q").toLowerCase().trim();
        res.setHeader('Content-Type', 'application/json');
        console.log(q);

        if (q.startsWith("okay marco") || q.startsWith("okay michael")) {
            intents.find(q).then(rs => res.send(JSON.stringify(rs)));
        } else {
            res.send({ignore: true})
        }
    }
};

// var req = {
//     // param: () => "okay marco hello how are you"
//     param: () => "okay Michael can you search for women"
// }
// var res = {
//     setHeader: () => console.log("set header"),
//     send: (s) => console.log("send " + JSON.stringify(s))
// }
// api.search(req, res)

module.exports = api;