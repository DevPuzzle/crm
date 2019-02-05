const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Status = require('./status');
const Platform = require('./platform');

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
      },
    company_id: {
        type: String,
        required: true
    },
    platform: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Platform'
    },
    info: {
        type: String
    },
    link: {
        type: String
    },
    status: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Status'
    },
    notification: {
        type: Object
    }
  });
  
  module.exports = mongoose.model('Project', projectSchema);