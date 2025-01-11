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
    const { breed, behavior, commonissue, appearance, averageAge } = req.body;

    try {
        const updatedBreed = await DogModel.findByIdAndUpdate(
            breedId,
            {
                breed,
                behavior,
                commonissue,
                appearance,
                averageAge,
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

router.get('/search', async (req, res) => {
    try {
        const query = req.query.query?.trim();

        // ตรวจสอบว่ามีคำค้นหรือไม่
        if (!query) {
            return res.status(400).json({ message: 'กรุณาระบุคำค้น' });
        }

        // ค้นหาข้อมูลในฐานข้อมูล (ใช้ regex เพื่อค้นหาแบบยืดหยุ่น)
        const keywords = query.split(' '); // แยกคำค้นเป็นคำย่อย
        const regexArray = keywords.map((word) => ({ breed: { $regex: word, $options: 'i' } }));

        // ค้นหาชื่อพันธุ์ที่ตรงกับคำค้น
        const dogs = await DogModel.find({
            $and: regexArray,
        });

        res.status(200).json(dogs); // ส่งข้อมูลกลับ
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหา' });
    }
});


module.exports = router;
