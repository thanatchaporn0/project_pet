const express = require('express');
const router = express.Router();
const DogModel = require('../model/dog');

var fs = require('fs');
var path = require('path')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

router.get('/', async(req, res) => {
    const dogs = await DogModel.find();
    res.render('dogdetails',{dogs:dogs});
});

router.get('/addbreed', (req, res) => {
    res.render('addbreed');
});

router.post('/addbreed', upload.single("image"), (req, res) => {
    try {
        const body =req.body;
        console.log(body)
        const newdog = new DogModel(body);
        newdog.image = req.file.filename;
        newdog.save();
        res.redirect("/dogdetails")

    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
