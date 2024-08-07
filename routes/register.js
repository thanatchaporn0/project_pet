const express = require('express');
const router = express.Router();

// GET register page
router.get('/', (req, res) => {
    res.render('register');
});

// POST register data
router.post('/', (req, res) => {
    const { email, name, password, confirmPassword } = req.body;
    // Add your registration logic here
    // For now, we will just log the registration data
    console.log(`Email: ${email}, Name: ${name}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    res.send('Registration successful');
});

module.exports = router;
