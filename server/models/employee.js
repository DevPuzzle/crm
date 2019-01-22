const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    email: {
      type: String,
      unique: true
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    skills: {
        type: String
    },
    company_id: {
        type: String,
        required: true
    }
  });
  
  module.exports = mongoose.model('Employee', employeeSchema);