const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('breed', { title: 'breed' });
});

module.exports = router;


