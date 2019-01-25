const validator = require('validator');
const Employee = require('../../models/employee');
const User = require('../../models/user');
const {checkAuth} = require('../../helpers/helpers');

module.exports = {
    createEmployee: async function({ employeeInput }, req) {
      
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
      console.log('employeeInput', employeeInput);
      if(user === null || companyId === null) {
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

    employee: async function({_id}) {
      try{
        const foundEmployee = await Employee.findById(_id);
        return foundEmployee;
      }catch(err) {
        const error = new Error();
        error.data = 'User was not found';
        error.code = 422;
        throw error;
      }
    },

    employees: async function(_, req) {
      checkAuth(req.isAuth);
      // get current user
      const user = await User.findById(req.userId);
      // find all employees where user.company_id = company_id
      const employees = await Employee.find({company_id: user.company_id});
      return employees;
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