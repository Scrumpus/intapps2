var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IntApp' });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'IntApp' });
});


module.exports = router;
