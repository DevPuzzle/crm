const {makeExecutableSchema} = require('graphql-tools');
const authControllers = require('../../mongodb/controllers/auth');

const typeDefs = `
  type Query {
    login(email: String!, password: String!): AuthData!
  }

  type AuthData {
    token: String!
    userId: String!
  }
`;

const resolvers = {
  Query: {
    login: authControllers.signUserIn
  }
};

exports.AuthSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});