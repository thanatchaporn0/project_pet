const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String, 
  name: String,
  sex: String,
  age: String,
  password: String,
  role: {
    type: Number,
    default: 0 // 0 = ผู้ใช้ธรรมดา, 1 = admin
    
},

});

module.exports = mongoose.model('User', userSchema);