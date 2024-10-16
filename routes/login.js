var express = require('express');
var router = express.Router();
const UserModel = require('../model/user');


// GET login page
router.get('/', (req, res) => {
    if (!req.session.loginsession) {
        res.render('login');


    } else {
        res.redirect("/")
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');

});

// POST login data
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await UserModel.findOne({ email: email, password: password })
        console.log(result)
        if (result.role == 1) {
            req.session.loginsession = result;

            res.redirect("/adminhome")
        } else {
            req.session.loginsession = result;

            res.redirect("/")
        }
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
