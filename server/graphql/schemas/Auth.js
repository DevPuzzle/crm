const {makeExecutableSchema} = require('graphql-tools');
const authController = require('../../controllers/authController');

const typeDefs = `
  type Query {
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    signup(signupInput: SignupInputData): User!
  }

  input SignupInputData {
    email: String!
    name: String
    password: String!
    company_name: String!
  }

  type AuthData {
    token: String!
    userId: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    company_id: String!
  }
`;

const resolvers = {
  Query: {
    login: (_, args) => {
      return authController.signUserIn(args);
    }
  },
  Mutation: {
    signup: (_, signupInput) => {
      return authController.signUserUp(signupInput);
    }
  }
};

exports.AuthSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});