const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');


function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }

// GET register page
router.get('/', (req, res) => {
    res.render('register');
});

// POST register data
router.post('/',async (req, res) => {
    try {
        const usedEmail = await UserModel.find({}, { 'email': 1, '_id': 0 })//ดึงข้อมูลอีเมลที่ใช้ไปแล้ว
        if (!contains(usedEmail, "email", req.body.email)) {
            const newuser = new UserModel(req.body);
            newuser.save()
            res.redirect('/login');
        } else {
          res.json({ "error": 'this email or username is already taken!!' })    
        }
      } catch (error) {
        console.log(error)
        res.send(error)
      }

    
});


module.exports = router;
