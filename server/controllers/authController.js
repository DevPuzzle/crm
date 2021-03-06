const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../mongodb/models/user');
const Company = require('../mongodb/models/company');
const nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var mailer = require('../email/mailer');
const keys = require('../config/keys');

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
  `${keys.JWT_KEY}`,
  {  expiresIn: '2h' }
  );
  return { token: token, userId: user._id.toString() }
};

async function signUserUp({ signupInput }) {
  const errors = [];
  // if (!validator.isEmail(signupInput.email)) {
  //   errors.push('E-mail is invalid');
  // }
  // if (validator.isEmpty(signupInput.password) || !validator.isLength(signupInput.password, { min: 6})) {
  //   errors.push('Password too short');
  // }
  // if (validator.isEmpty(signupInput.company_name) || !validator.isLength(signupInput.company_name, { min: 2})) {
  //   errors.push('Company name too short!');
  // }
  const existingUser = await User.findOne({ email: signupInput.email });
  if (existingUser) {
    errors.push({message: 'User exists already!'});
  }

  const existingCompany = await Company.findOne({ name: signupInput.company_name });
  if (existingCompany) {
    errors.push({message: 'Company exists already!'});
  }

   if (errors.length > 0) {
    const error = new Error(JSON.stringify(errors));
    error.data = errors;
    error.status = 422;
    throw error;
  }
  const company = new Company({
    name: signupInput.company_name
  });

  const createdCompany = await company.save();
  
  const hashedPw = await bcrypt.hash(signupInput.password, 12);
  const user = new User({
    name: signupInput.name,
    email: signupInput.email,
    company_id: company._id.toString(),
    password: hashedPw
  });
 const createdUser = await user.save();

 mailer.readHTMLFile(__dirname + '/../email/templates/sigup.hbs', function(err, html) {
    var template = handlebars.compile(html);
    var replacements = {
         user: user.name,
         login: user.email,
         pass: signupInput.password,
         company: company.name
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: `<${keys.EMAIL_USER}>`,
        to: user.email,
        subject: "Welcome to ArgosyCRM",
        text: "Thank you for signing up",
        html : htmlToSend
     };
     mailer.transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            callback(error);
        }
    });
});
  return { ...createdUser._doc, _id: createdUser._id.toString() };
};

module.exports = {
  signUserIn: signUserIn,
  signUserUp: signUserUp
}