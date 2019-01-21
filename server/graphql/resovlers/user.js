const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Company = require('../../models/company');

module.exports = {
  createUser: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({message: 'E-mail is invalid'});
    }
    if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 6})) {
      errors.push({message: 'Password too short'});
    }
    if (validator.isEmpty(userInput.company_name) || !validator.isLength(userInput.company_name, { min: 2})) {
      errors.push({message: 'Company name too short!'});
    }
    // if (errors.length > 0) {
    //   const error = new Error('Invalid input');
    //   error.data = errors;
    //   error.code = 422;
    //   throw error;
    // }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      errors.push({message: 'User exists already!'});
      // const error = new Error('User exists already!');
      
      // throw errors;
    }

    const existingCompany = await Company.findOne({ name: userInput.company_name });
    console.log(existingCompany);
    if (existingCompany) {
      errors.push({message: 'Company exists already!!'});
      // const error = new Error('Company exists already!');
      // throw errors;
    }
    console.log(errors);
     if (errors.length > 0) {
      const error = new Error(errors);
      error.data = errors;
      error.code = 422;
      console.log(error);
      throw error;
    }
    const company = new Company({
      name: userInput.company_name
    });
    const createdCompany = await company.save();
    console.log(createdCompany);
    
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      company_id: company._id.toString(),
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  getUser: async function({ _id }) {
    const user = await User.findOne({ _id: _id });
    if (!user) {
      const error = new Error('User not found');
      throw error;
    }
    return user;  
  },
  login: async function({ email, password }) {
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
      email: user.email
    },
    'crmdevpuzzlekey',
    {  expiresIn: '1h' }
    );
    return { token: token, userId: user._id.toString() }
  }
};
