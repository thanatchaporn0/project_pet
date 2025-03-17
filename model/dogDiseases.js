const mongoose = require('mongoose');
const { Schema } = mongoose;

const DogDiseasesSchema = new Schema({
    diseasesType: String,
    name: String,
    description: String,
});

module.exports = mongoose.model('DogDiseases', DogDiseasesSchema);