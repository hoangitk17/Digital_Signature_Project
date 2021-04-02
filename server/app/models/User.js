const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required:  true },
  phoneNumber: { type: String, required:  true },
  userName: { type: String, required:  true },
  password: { type: String, required:  true },
  cardId: { type: String, required:  true },
  dateOfBirth: Date,
  address: { type: String, required:  true },
  privateKey: { type: String, required:  true },
  publicKey: { type: String, required:  true },
  status: Number,
  signImage: { type: String, required:  true },
  avatar: { type: String, required:  true },
})

var User = mongoose.model('User', userSchema);

module.exports = User;