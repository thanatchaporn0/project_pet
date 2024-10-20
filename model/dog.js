const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new Schema({
    breed: String,
    appearance:String,
    commonissue:String,
    behavior:String,
    averageAge:String,
    exercise:String,
    watchdog:String,
    image:String

});

module.exports = mongoose.model('Dog', dogSchema);