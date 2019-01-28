const validator = require('validator');
const Company = require('../mongodb/models/company');

async function getCompany(_, {_id}, req) {
    console.log('YOU GOT COMPANY');
    const company = await Company.findById(_id);
    console.log(company);
    return company;
  };
  
  module.exports = {
    getCompany: getCompany
  }