var express = require('express');
var router = express.Router();

/* GET game home page. */
router.get('/', function(req, res, next) {
  res.render('game', { title: 'Eat Me' });
});

module.exports = router;
