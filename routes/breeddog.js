const express = require('express');
const router = express.Router();

// GET breed recommendation page
router.get('/', (req, res) => {
    res.render('breeddog');
});

// POST save recommendation
router.post('/save-recommendation', (req, res) => {
    const { breed, percentage } = req.body;

    res.json({ success: true });
});

module.exports = router;
