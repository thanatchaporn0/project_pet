const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.get('/', async (req, res) => {
    try {
        const normaluser = await UserModel.find({ role: 0 });
        res.render('userdetails', { users: normaluser });

    } catch (er) {
        console.log(er)

    }

});

router.get('/delete/:id', async (req, res) => {
    try {
        const result = await UserModel.findOneAndDelete({ _id: req.params.id })
        res.redirect("/userdetails")

    } catch (error) {
        console.log(error)
    }

});


module.exports = router;
