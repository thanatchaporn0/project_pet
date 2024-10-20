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

router.get('/', function (req, res, next) {
  res.render('index', { title: 'home page' });
});


router.get('/adminhome',async function (req, res, next) {
  try {
    console.log(req.session.loginsession);
    if (req.session.loginsession) {
      if (req.session.loginsession.role == 1) {
        const count = await UserModel.countDocuments({role:0})
        console.log(count)
        res.render("adminhome",{'count':count})


      } else {
        res.redirect("/")
      }
    }else{
      res.redirect("/")
    }



  } catch (error) {
    console.log(error)
  }

});

module.exports = router;


