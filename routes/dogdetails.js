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

router.get('/', async (req, res) => {
    const dogs = await DogModel.find();
    res.render('adminDogs', { dogs: dogs });
});

router.get('/addbreed', (req, res) => {
    res.render('addbreed');
});

router.post('/addbreed', upload.single("image"), (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        const newdog = new DogModel(body);
        newdog.image = req.file.filename;
        newdog.save();
        res.redirect("/dog")

    } catch (error) {
        console.log(error)
    }

});
router.get('/editbreed/:id', async (req, res) => {

    try {
        const breed = await DogModel.findById({ _id: req.params.id });
        if (breed) {
            res.render('editdog', { breed });
        } else {
            res.status(404).send('พันธุ์สุนัขไม่พบ');
        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/delete/:id', upload.single("image"), async (req, res) => {
    try {
        const result = await DogModel.findOneAndDelete({ _id: req.params.id })
        res.redirect("/dog")

    } catch (error) {
        console.log(error)
    }

});

router.post('/editbreed/:id', upload.single('image'), async (req, res) => {
    const breedId = req.params.id;
    const { breed, behavior, commonissue, appearance, averageAge, exercise, watchdog} = req.body;

    try {
        const updatedBreed = await DogModel.findByIdAndUpdate(
            breedId,
            {
                breed,
                behavior,
                commonissue,
                appearance,
                averageAge,
                exercise,
                watchdog,
                image: req.file ? req.file.filename : undefined,
            },
            { new: true }
        );
        res.redirect('/dog');
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});


module.exports = router;
