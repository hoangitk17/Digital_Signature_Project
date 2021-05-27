const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  userId: {type: String},
  action: {type: String},
  time: {type: String}
}, {
    timestamps: true
})

var Log = mongoose.model('Log', logSchema);

module.exports = Log;