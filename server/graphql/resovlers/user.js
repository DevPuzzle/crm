const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../../models/user');

module.exports = {
  createUser: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({message: 'E-mail is invalid'});
    }
    if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 8})) {
      errors.push({message: 'Password too short'});
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      company_id: userInput.company_id,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  getUser: async function(req) {
    const user = await User.findOne({ _id: '5c419152d1411104dc4137e2' });
    if (!user) {
      const error = new Error('User not found');
      throw error;
    }
    return user;  
  }
};
