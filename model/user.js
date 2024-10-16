const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  name: String,
  password: String,
  role: {
    type: Number,
    default: 0
    // 0 = ผู้ใช้ธรรมดา, 1 = admin
},


});
//ทำโครงสร้างไว้ก่อน

module.exports = mongoose.model('User', userSchema);