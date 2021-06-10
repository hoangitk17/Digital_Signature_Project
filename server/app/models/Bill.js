const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  name: { type: String/* , required:  true */ },
  email: { type: String/* , required:  true */ },
  phoneNumber: { type: String/* , required:  true */ },
  address: { type: String/* , required: true */}
}, {
    timestamps: true
})

var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;