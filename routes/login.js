var express = require('express');
var router = express.Router();

// GET login page
router.get('/', (req, res) => {
    res.render('login');
});

// POST login data
router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Here you would add your authentication logic
    // For now, we will just log the email and password
    console.log(`Email: ${email}, Password: ${password}`);
    res.send('Login successful');
});

module.exports = router;
