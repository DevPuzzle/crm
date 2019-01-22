const validator = require('validator');

const Employee = require('../../models/employee');
const User = require('../../models/user');
const Company = require('../../models/company');

module.exports = {
    createEmployee: async function({ employeeInput }, req) {
    // console.log(employeeInput);    
        const errors = [];
        if (!validator.isEmail(employeeInput.email)) {
        errors.push({message: 'E-mail is invalid'});
        }
        if (!validator.isEmpty(employeeInput.email)) {
          errors.push({message: 'E-mail required'});
        }
        if (!validator.isEmpty(employeeInput.name)) {
          errors.push({message: 'Name required'});
        }

        const user = await User.findOne({ _id: '1c45a3cadcb89f0c2e23a692' });
        
        const company =  await Company.findOne({_id: user.company_id.toString()});
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