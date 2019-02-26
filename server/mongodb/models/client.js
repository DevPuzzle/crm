const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true
      },
    skype: {
        type: String
    },
    comment: {
        type: String
    },
    company_id: {
        type: String,
        required: true
    }
  });
  
  module.exports = mongoose.model('Client', clientSchema);