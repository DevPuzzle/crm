const {makeExecutableSchema} = require('graphql-tools');
const User = require('../../mongodb/models/user');
const authController = require('../../controllers/authController');
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
    user(_id: String!): User!
  }
`;

const resolvers = {
  Query: {
    getAuthorizedUser: (_, args, req) => userController.getAuthorizedUser(args, req),
    user: (_, args, req) => userController.getUserById(args, req)
  },
  // Mutation: {
  //   createUser: (_, args, req) => authController.createUser(args, req)
  // }
};

exports.UserSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
