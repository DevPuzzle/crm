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

async function updateEmployee({id, employeeInput}, req) {
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
  const employee = await Employee.findById({ _id: id });
  if (!employee) {
    const error = new Error('No employee found!');
    error.code = 404;
    throw error;
  }
  if (employee._id.toString() !== id) {
    const error = new Error('No authorized!');
    error.code = 403;
    throw error;
  }
  employee.email = employeeInput.email;
  employee.name = employeeInput.name;
  employee.last_name = employeeInput.last_name;
  employee.skills = employeeInput.skills;

  console.log('THIS IS UPDATED EMPLOYEE', employee);

  const updatedEmployee = await employee.save();
  return {...updatedEmployee._doc, _id: updatedEmployee._id.toString()};
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

async function getEmployees(req) {
  if(!req.isAuth) {
    const error = new Error('Not Authenticated!');
    error.status = 401;
    throw error;
  }
  const user = await User.findById(req.userId);
  const employees = await Employee.find({company_id: user.company_id});
  return employees;
}

module.exports = {
  getEmployeeById: getEmployeeById,
  getEmployees: getEmployees,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee
}