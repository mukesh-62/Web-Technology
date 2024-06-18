const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: String
});

module.exports = mongoose.model('Hostel', hostelSchema);
