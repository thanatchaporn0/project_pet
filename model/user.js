const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // แฮชรหัสผ่านก่อนบันทึก
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// ป้องกันไม่ให้รหัสผ่านแสดงในการดึงข้อมูล
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; // ลบข้อมูล password ออกจากผลลัพธ์
  return user;
};

module.exports = mongoose.model('User', userSchema);