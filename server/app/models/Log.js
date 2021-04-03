const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  userId: {type: String},
  time: {type: Date},
  action: {type: String},
})

var Log = mongoose.model('Log', logSchema);

module.exports = Log;