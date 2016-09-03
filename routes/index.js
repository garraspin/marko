var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Marko' });
});


// router.get('/', function (req, res) {
//   if(req.session.username) {
//     res.send('<p>Hello, ' + req.session.username+ '!</p><p><a href="/logout">logout</a></p>');
//   } else {
//     res.send('<form action="/login"><label for="username">Username</label> <input type="text" name="username" id="username"> <p><input type="submit" value="Submit"></p></form>');
//   }
// });
//
// router.get('/login', function(req, res) {
//     if (req.query.username) {
//         req.session.username = req.query.username;
//     }
//     res.send('<p>You have been logged in, ' + req.session.username+'</p><p><a href="/">Home</a></p>');
// });
//
// router.get('/logout', function(req,res) {
//     delete req.session.username;
//     res.send('<p>Sorry to see you go!</p><p><a href="/">Home</a></p>');
// });

module.exports = router;
