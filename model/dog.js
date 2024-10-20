const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new Schema({
    breed: String,
    appearance:String,
    commonissue:[{type:String}],
    behavior:String,
    averageAge:String,
    exercise:String,
    watchdog:String,
    image:String

});
//ทำโครงสร้างไว้ก่อน

module.exports = mongoose.model('Dog', dogSchema);