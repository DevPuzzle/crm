const validator = require('validator');
const Client = require('../mongodb/models/client');

const {checkAuth} = require('../helpers/helpers');

async function createEmployee({ employeeInput }, req) {
    checkAuth(req.isAuth);
    const errors = [];
    
    if (!validator.isEmail(employeeInput.email)) {
      errors.push({message: 'E-mail is invalid'});
    }
    if (validator.isEmpty(employeeInput.email)) {
      errors.push({message: 'E-mail required'});
    }
    if (validator.isEmpty(employeeInput.name)) {
      errors.push({message: 'Name required'});
    }
    const user = await User.findById({ _id: req.userId });
    const companyId = req.companyId;
  
    if(user === null || companyId === null) {
        errors.push({message: 'User or company not found'});
    }
  
    if (errors.length > 0) {
      const error = new Error(errors);
      error.data = errors;
      error.code = 422;
      console.log(error);
      throw error;
    }
    
    const employee = new Employee({
        email: employeeInput.email,
        name: employeeInput.name,
        last_name: employeeInput.last_name,
        skills: employeeInput.skills,
        company_id: companyId
    });
    const createdEmployee = await employee.save();
    return { ...createdEmployee._doc };
  }

module.exports = {
    createClient: createClient
}