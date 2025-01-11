var express = require('express');
var router = express.Router();
const UserModel = require('../model/user');


router.get('/', (req, res) => {
    if (!req.session.loginsession) {
        res.render('login');

    } else {
        res.redirect("/")
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');

});


router.get('/forgotPassword', async (req, res) => {
    res.render('forgotPassword');
});


router.get('/editproflie/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        console.log(user)
        if (user) {
            res.render('editproflie', { user: user });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
});


//post
router.post('/forgotPassword', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.status(400).send("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
    }
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            user.password = password;
            await user.save();
            res.redirect("/login"); 
        } else {
            res.status(404).send("ไม่พบผู้ใช้ที่มีอีเมลนี้");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
    }
});



router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await UserModel.findOne({ email: email, password: password })
        console.log(result)
        if (result.role == 1) {
            req.session.loginsession = result;
            res.redirect("/adminhome")
        } else {
            req.session.loginsession = result;
            res.redirect("/")
        }
    } catch (error) {
        console.log(error)
    }
});


router.post('/editproflie/:id', async (req, res) => {    //: พารามิเตอร์ 
    const { email, name, sex, age } = req.body;     //ดึง
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
            email,
            name,
            sex,
            age
        }, { new: true });

        if (updatedUser) {

            res.redirect("/login/editproflie/" + req.params.id)
        } else {
            res.status(404).send({ status: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
