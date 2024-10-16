const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

// GET home page
router.get('/', (req, res) => {
    res.render('home');
});


module.exports = router;
