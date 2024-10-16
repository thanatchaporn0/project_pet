var express = require('express');
var router = express.Router();
const UserModel = require('../model/user');


// GET login page
router.get('/', (req, res) => {
    res.render('login');
});

// POST login data
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await UserModel.findOne({ email: email, password: password })
        console.log(result)
        if(result.role == 1){
            res.redirect("/adminhome")
        }else{
            res.redirect("/")
        }
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
