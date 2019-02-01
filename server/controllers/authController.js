const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../mongodb/models/user');
const Company = require('../mongodb/models/company');

async function signUserIn({email, password}) {
  const user = await User.findOne({email: email});
  if (!user) {
    const error = new Error('User not found');
    error.code = 401;
    throw error;
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    const error = new Error('password is incorrect!');
    error.code = 401;
    throw error;
  }
  const token = jwt.sign({
    userId: user._id.toString(),
    email: user.email,
    companyId: user.company_id
  },
  'crmdevpuzzlekey',
  {  expiresIn: '2h' }
  );
  return { token: token, userId: user._id.toString() }
};

async function signUserUp({ signupInput }) {
  const errors = [];
  if (!validator.isEmail(signupInput.email)) {
    errors.push({message: 'E-mail is invalid'});
  }
  if (validator.isEmpty(signupInput.password) || !validator.isLength(signupInput.password, { min: 6})) {
    errors.push({message: 'Password too short'});
  }
  if (validator.isEmpty(signupInput.company_name) || !validator.isLength(signupInput.company_name, { min: 2})) {
    errors.push({message: 'Company name too short!'});
  }
  const existingUser = await User.findOne({ email: signupInput.email });
  if (existingUser) {
    errors.push({message: 'User exists already!'});
  }

  const existingCompany = await Company.findOne({ name: signupInput.company_name });
  if (existingCompany) {
    errors.push({message: 'Company exists already!'});
  }
   if (errors.length > 0) {
    const error = new Error(errors);
    error.data = errors;
    error.code = 422;
    throw error;
  }
  const company = new Company({
    name: signupInput.company_name
  });

  const createdCompany = await company.save();
  
  const hashedPw = await bcrypt.hash(signupInput.password, 12);
  const user = new User({
    email: signupInput.email,
    name: signupInput.name,
    company_id: company._id.toString(),
    password: hashedPw
  });
  const createdUser = await user.save();
  return { ...createdUser._doc, _id: createdUser._id.toString() };
};

module.exports = {
  signUserIn: signUserIn,
  signUserUp: signUserUp
}