const express = require('express');
const DogModel = require('../model/dog');
const router = express.Router();
const UserModel = require('../model/user');
const { authChecker } = require('../middleware/AuthChecker');
const DogDiseasesModel = require('../model/dogDiseases');
const DogBodyLanguagesModel = require('../model/dogBodyLanguage');

router.get('/dogdetails', authChecker, async function (req, res, next) {
  const dogs = await DogModel.find();
  console.log(dogs)
  res.render('allBreed', { dogs: dogs });
});


router.get('/search', async (req, res) => {
  try {
    const query = req.query.query?.trim();
    if (!query) {
      return res.status(400).render('allBreed', {
        dogs: [],
        message: 'กรุณาระบุคำค้น'
      });
    }

    const dogs = await DogModel.find({
      breed: { $regex: query, $options: 'i' },
    });

    // ส่งข้อมูลผลลัพธ์ไปยังหน้า allBreed.ejs
    res.render('allBreed', {
      dogs: dogs,
      message: dogs.length > 0 ? null : 'ไม่พบผลลัพธ์ที่ตรงกัน'
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('allBreed', {
      dogs: [],
      message: 'เกิดข้อผิดพลาดในการค้นหา'
    });
  }
});

router.get('/searchadmin', async (req, res) => {
  try {
    const query = req.query.query?.trim();
    if (!query) {
      return res.status(400).render('adminDogs', {
        dogs: [],
        message: 'กรุณาระบุคำค้น'
      });
    }

    const dogs = await DogModel.find({
      breed: { $regex: query, $options: 'i' },
    });

    // ส่งข้อมูลผลลัพธ์ไปยังหน้า adminDogs.ejs
    res.render('adminDogs', {
      dogs: dogs,
      message: dogs.length > 0 ? null : 'ไม่พบผลลัพธ์ที่ตรงกัน'
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('adminDogs', {
      dogs: [],
      message: 'เกิดข้อผิดพลาดในการค้นหา'
    });
  }
});


router.get('/content', async function (req, res, next) {
  res.render('content',);
});
router.get('/editPage', async function (req, res, next) {
  res.render('edit_page',);
});

//breed.ejs
router.get('/dogdetails/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    console.log(id)
    const dogs = await DogModel.findOne({ _id: id });
    console.log(req.params.id)
    res.render('breed', { dogs: dogs });
  } catch (error) {
    console.log(error);
  }
});


router.get('/adminBreed/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    console.log(id)
    const dogs = await DogModel.findOne({ _id: id });
    console.log(req.params.id)
    res.render('adminBreed', { dogs: dogs });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'home page' });
});

router.get('/contentdog', function (req, res, next) {
  res.render('contentdog', { title: 'home page' });
});

router.get('/sick', async (req, res) => { 
  const DogDiseases = await DogDiseasesModel.find();
  
  // จัดกลุ่มตาม diseasesType
  const groupedDiseases = DogDiseases.reduce((acc, disease) => {
      if (!acc[disease.diseasesType]) {
          acc[disease.diseasesType] = [];
      }
      acc[disease.diseasesType].push({
          name: disease.name,
          description: disease.description
      });
      return acc;
  }, {});

  res.render('sick', { groupedDiseases });
});


router.get('/language', async (req, res) => {
  const DBL = await DogBodyLanguagesModel.find();
      res.render('language', { DBL: DBL });
});

router.get('/adminhome', async function (req, res, next) {
  try {
    console.log(req.session.loginsession);
    if (req.session.loginsession) {
      const userRole = req.session.loginsession.role;

      if (userRole === 1) {
        const countUser = await UserModel.countDocuments({ role: 0 });

        const countAdmin = await UserModel.countDocuments({ role: 1 });

        console.log("Count of users (role 0):", countUser);
        console.log("Count of admins (role 1):", countAdmin);

        res.render("adminhome", {
          'countUser': countUser,
          'countAdmin': countAdmin
        });

      } else if (userRole === 0) {

        res.redirect("/");
      } else {

        res.redirect("/");
      }

    } else {
      res.redirect("/");
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
