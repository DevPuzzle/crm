const {makeExecutableSchema} = require('graphql-tools');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../../models/user');
const Company = require('../../models/company');

const typeDefs = `
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    company_id: String!
  }

  type UserData {
    status: String
    email: String!
    name: String!
    company_id: String!
  }

  input UserInputData {
    email: String!
    name: String
    password: String!
    company_name: String!
  }

  type Query {
    user(_id: String!): UserData!
  }

  type Mutation {
    createUser(userInput: UserInputData): User!
  }
`;

let getUser = async function({ _id }) {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    const error = new Error('User not found');
    throw error;
  }
  return user;  
};

let createUser = async function({ userInput }, req) {
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
  const existingUser = await User.findOne({ email: userInput.email });
  if (existingUser) {
    errors.push({message: 'User exists already!'});
  }

  const existingCompany = await Company.findOne({ name: userInput.company_name });
  console.log(existingCompany);
  if (existingCompany) {
    errors.push({message: 'Company exists already!'});
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
};

let resolvers = {
  Query: {
    user: getUser
  },
  Mutation: {
    createUser: createUser
  }
};

exports.UserSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
