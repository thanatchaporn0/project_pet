const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
        "housing":String,
        "lifestyle":String,
        "freetime":String,
        "Ischildren":String,
        "IsOtheranimal":String,
        "space":String,
        "preferredbehavior":[{type:String}],
        "noiseproblem":String,
        "clean":String,
        "breed":String,
        user_id: {
                type: mongoose.Types.ObjectId, ref: "User",
                required: true
        },
        result:String
});

module.exports = mongoose.model('FormHistory', HistorySchema);
