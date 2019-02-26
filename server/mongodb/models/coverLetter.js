const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coverLetterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    letters: [{
       text: String
    }],
    company_id: {
        type: String,
        required: true
    }
  });
  
  module.exports = mongoose.model('CoverLetter', coverLetterSchema);