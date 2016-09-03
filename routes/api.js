var express = require('express');
var api = require('../controllers/api');
var router = express.Router();

router.get('/search', api.search);

module.exports = router;
