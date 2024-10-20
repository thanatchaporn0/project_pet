const express = require('express');
const DogModel = require('../model/dog');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'home page' });
});

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

module.exports = router;


