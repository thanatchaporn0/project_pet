const express = require('express');
const router = express.Router();
const HistoryModel = require('../model/formHistory')
// GET form page
router.get('/', (req, res) => {
    if(req.session.loginsession){
        res.render('form');
    }else{
        res.redirect('/login')
    }
    
    
});

// เปลี่ยนตัวแปร และ res.redirect

// POST form submission
router.post('/sendform', (req, res) => {
    if(req.session.loginsession){
        try{
            const answers = req.body; // รับข้อมูลจากแบบฟอร์,
            const his = new HistoryModel(answers);
            console.log(req.session)
            his.user_id = req.session.loginsession._id;
            his.save()
            res.redirect('/'); // เปลี่ยนเส้นทางไปยัง /
    
        }catch(error){
            console.log(error)
        }

    }else{
        res.redirect('/login')
    }
    
  
});

module.exports = router;

