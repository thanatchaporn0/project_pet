const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new Schema({
name : String,
age : Number,
breed : String

});
//ทำโครงสร้างไว้ก่อน

module.exports = mongoose.model('Dog', dogSchema);