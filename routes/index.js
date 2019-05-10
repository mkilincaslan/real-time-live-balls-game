var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user)
    res.render('index', { title: 'Welcome To Eat-Me Login' });
  else
    res.redirect('/game');
});

module.exports = router;
