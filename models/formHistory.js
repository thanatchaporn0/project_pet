const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
        "housing":String,
        "lifestyle":String,
        "freetime":String,
        "Ischildren":String,
        "IsOtheranimal":String,
        "space":String,
        "preferredbehavior":String,
        "noiseproblem":String,
        "clean":String,
        "breed":String
});

module.exports = mongoose.model('FormHistory', HistorySchema);
