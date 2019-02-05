const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    client_id: {
        type: String
    },
    employee_id: {
        type: String
      },
    company_id: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    link: {
        type: String
    },
    status: {
        type: String
    },
    notification: {
        type: Object
    }
  });
  
  module.exports = mongoose.model('Project', projectSchema);