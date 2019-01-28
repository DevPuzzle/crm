const validator = require('validator');
const Employee = require('../mongodb/models/employee');
const User = require('../mongodb/models/user');
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

async function getEmployeeById (_, {_id}, req) {
  try{
    const foundEmployee = await Employee.findById(_id);
    return foundEmployee;
  }catch(err) {
    const error = new Error();
    error.data = 'User was not found';
    error.code = 422;
    throw error;
  }
}

async function getEmployees(_, req) {
  checkAuth(req.isAuth);
  const user = await User.findById(req.userId);
  const employees = await Employee.find({company_id: user.company_id});
  return employees;
}

module.exports = {
  getEmployeeById: getEmployeeById,
  getEmployees: getEmployees,
  createEmployee: createEmployee
}