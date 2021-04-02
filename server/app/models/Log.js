const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  userId: String,
  time: Date,
  action: String,
})

var Log = mongoose.model('Log', logSchema);

module.exports = Log;