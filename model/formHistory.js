const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
        predicted_breed: { type: String },
        createdAt: { type: Date, default: Date.now },
        user:{type: mongoose.Types.ObjectId, ref: "User",
                required: true}
});

module.exports = mongoose.model('FormHistory', HistorySchema);
