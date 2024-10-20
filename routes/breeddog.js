const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('breeddog');
});

router.post('/save-recommendation', (req, res) => {
    const { breed, percentage } = req.body;
    res.json({ success: true });
});

module.exports = router;
