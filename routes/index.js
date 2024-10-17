const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

//GET home page.
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


