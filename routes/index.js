var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(!req.session.isLogined) req.session.isLogined = "no";
  res.render('index');
});

module.exports = router;
