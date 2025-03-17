const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogBodyLanguageSchema = new Schema({
    posture: String,
    implication: String,
});

module.exports = mongoose.model('DogBodyLanguage', dogBodyLanguageSchema);