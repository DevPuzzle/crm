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
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: false,
        default: null
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
        required: false,
        default: null
      },
    company_id: {
        type: String,
        required: true
    },
    platform: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Platform',
        required: false,
        default: null
    },
    info: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    },
    status: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Status',
        required: false,
        default: null
    },
    notification: {
        type: Object,
        default: null
    }
  });
  
  module.exports = mongoose.model('Project', projectSchema);