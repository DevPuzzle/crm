const {makeExecutableSchema} = require('graphql-tools');
const User = require('../../mongodb/models/user');
const userController = require('../../controllers/userController');

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

  type AuthorizedUserData {
    _id: String!
    name: String!
    email: String!
    company_id: String!
    company_name: String!
  }

  input UserInputData {
    email: String!
    name: String
    password: String!
    company_name: String!
  }

  type Query {
    getAuthorizedUser: AuthorizedUserData!
  }
`;

const resolvers = {
  Query: {
    getAuthorizedUser: userController.getAuthorizedUser
  }
};

exports.UserSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
