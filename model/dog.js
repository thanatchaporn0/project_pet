const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new Schema({
    breed: String,
    appearance:String,
    commonissue:[{type:String}],
    behavior:[{type:String}],
    averageAge:String,
    exercise:String,
    watchdog:String,
    image:String

});

module.exports = mongoose.model('Dog', dogSchema);