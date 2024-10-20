const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.get('/', async(req, res) => {
    try {
        const normaluser = await UserModel.find({role:0});
        res.render('userdetails', { users: normaluser });

    } catch (er) {
        console.log(er)

    }

});


module.exports = router;
