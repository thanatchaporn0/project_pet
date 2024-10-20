const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

//GET home page.
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


