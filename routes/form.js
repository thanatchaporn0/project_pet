const express = require('express');
const router = express.Router();
const HistoryModel = require('../models/formHistory')
// GET form page
router.get('/', (req, res) => {
    res.render('form');
});

// เปลี่ยนตัวแปร และ res.redirect

// POST form submission
router.post('/sendform', (req, res) => {
    const answers = req.body; // รับข้อมูลจากแบบฟอร์,
    const his = new HistoryModel(answers);
    his.save()
    res.redirect('/'); // เปลี่ยนเส้นทางไปยัง /
});

module.exports = router;

