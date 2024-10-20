const express = require('express');
const DogModel = require('../model/dog');
const router = express.Router();
const UserModel = require('../model/user');


router.get('/dogdetails', async function(req, res, next) {
  const dogs = await DogModel.find();
  console.log(dogs)
  res.render('allBreed', { dogs: dogs });
});

router.get('/content', async function(req, res, next) {
  res.render('content', );
});

router.get('/dogdetails/:id', async function(req, res, next) {
  try {
    const id = req.params.id
    console.log(id)
    const dogs = await DogModel.findOne({_id:id});
    console.log(req.params.id)
    res.render('breed', { dogs: dogs });
  } catch (error) {
    console.log(error);
  }
});

router.get('/', function (req, res, next) {
  res.render('index', { title: 'home page' });
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
