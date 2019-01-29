const validator = require('validator');
const Company = require('../mongodb/models/company');

async function getCompany(companyId) {
  console.log(companyId);
  const company = await Company.findById(companyId);
  return company;
};
  
module.exports = {
  getCompany: getCompany
}