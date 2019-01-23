const validator = require('validator');

const Employee = require('../../models/employee');
const User = require('../../models/user');
const Company = require('../../models/company');

module.exports = {
    createEmployee: async function({ employeeInput }, req) {
      if (!req.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
      }
      const errors = [];
      if (!validator.isEmail(employeeInput.email)) {
      errors.push({message: 'E-mail is invalid'});
      }
      if (validator.isEmpty(employeeInput.email)) {
        errors.push({message: 'E-mail required'});
      }
      if (!validator.isEmpty(employeeInput.name)) {
        errors.push({message: 'Name required'});
      }

      const user = await User.findById({ _id: req.userId });
      
      const company =  await Company.findById({_id: user.company_id.toString()});
      const companyId = company._id.toString();
      
      if(user === null || company === null) {
          errors.push({message: 'User or company not found'});
      }
      console.log(errors);
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
      console.log(createdEmployee);
    
      return { ...createdEmployee._doc };
      },
    getEmployee: async function({ _id }) {
      const user = await User.findOne({ _id: _id });
      if (!user) {
        const error = new Error('User not found');
        throw error;
      }
      return user;  
    }
  };