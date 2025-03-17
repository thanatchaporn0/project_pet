const express = require('express');
const router = express.Router();
const axios = require('axios')
const HistoryModel = require('../model/formHistory')


router.get('/', (req, res) => {
    if (req.session.loginsession) {
        res.render('form');
    } else {
        res.redirect('/login')
    }
});


router.post('/sendform', async(req, res) => {
    if (req.session.loginsession) {
        try {
            const answers = req.body;
            const transformedAnswers = {
                housing: parseInt(answers.housing),
                lifestyle: parseInt(answers.lifestyle),
                freetime: parseInt(answers.freetime),
                Ischildren: parseInt(answers.Ischildren),
                IsOtheranimal: parseInt(answers.IsOtheranimal),
                space: parseInt(answers.space),
                preferredbehavior1: parseInt(answers.preferredbehavior1) || 0,
                preferredbehavior2: parseInt(answers.preferredbehavior2) || 0,
                preferredbehavior3: parseInt(answers.preferredbehavior3) || 0,
                preferredbehavior4: parseInt(answers.preferredbehavior4) || 0,
                preferredbehavior5: parseInt(answers.preferredbehavior5) || 0,
                preferredbehavior6: parseInt(answers.preferredbehavior6) || 0,
                preferredbehavior7: parseInt(answers.preferredbehavior7) || 0,
                preferredbehavior8: parseInt(answers.preferredbehavior8) || 0,
                preferredbehavior9: parseInt(answers.preferredbehavior9) || 0,
                preferredbehavior10: parseInt(answers.preferredbehavior10) || 0,
                preferredbehavior11: parseInt(answers.preferredbehavior11) || 0,
                preferredbehavior12: parseInt(answers.preferredbehavior12) || 0,
                preferredbehavior13: parseInt(answers.preferredbehavior13) || 0,
                preferredbehavior14: parseInt(answers.preferredbehavior14) || 0,

            };
            const userID = req.session.loginsession._id
            console.log("userID"+userID)
            console.log("Transformed Answers:", transformedAnswers);
            const result = await axios.post("http://127.0.0.1:8000/",{transformedAnswers:transformedAnswers,userID:userID} );
            res.redirect('/breed/getBreed');
        } catch (error) {
            console.log(error)
        }
        
    } else {
        res.redirect('/login')
    }
});

module.exports = router;

