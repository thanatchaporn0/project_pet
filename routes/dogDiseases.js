const express = require('express');
const router = express.Router();
const DogDiseasesModel = require('../model/dogDiseases');
const DogBodyLanguagesModel = require('../model/dogBodyLanguage');



router.get('/', async (req, res) => {
    const DogDiseases = await DogDiseasesModel.find();
    res.render('dogDiseases', { DogDiseases: DogDiseases });
});

router.get('/DBL', async (req, res) => {
    const DBL = await DogBodyLanguagesModel.find();
    res.render('dogBodyLanguage', { DBL: DBL });
});

router.post('/addDBL',async (req, res) => {
    try {
        const body = req.body;
        const newdog = new DogBodyLanguagesModel(body);
        await newdog.save();
        res.redirect("/dogDiseases/DBL")

    } catch (error) {
        console.log(error)
    }

});

router.post('/adddogDiseases',async (req, res) => {
    try {
        const body = req.body;
        const newdog = new DogDiseasesModel(body);
        await newdog.save();
        res.redirect("/dogDiseases")

    } catch (error) {
        console.log(error)
    }

});
router.get('/delete/:id',async (req, res) => {
    try {
        const result = await DogDiseasesModel.findOneAndDelete({ _id: req.params.id })
        res.redirect("/dogDiseases")

    } catch (error) {
        console.log(error)
    }

});
router.get('/deleteDBL/:id',async (req, res) => {
    try {
        const result = await DogBodyLanguagesModel.findOneAndDelete({ _id: req.params.id })
        res.redirect("/dogDiseases/DBL")

    } catch (error) {
        console.log(error)
    }

});



module.exports = router;
