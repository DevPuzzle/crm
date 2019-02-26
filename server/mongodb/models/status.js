const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    name: {
      type: String,
      unique: true
    }
  });
  
  module.exports = mongoose.model('Status', statusSchema);