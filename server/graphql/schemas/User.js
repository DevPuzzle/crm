const {makeExecutableSchema} = require('graphql-tools');
const User = require('../../mongodb/models/user');

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
`;
/* type Query {
    user(_id: String!): UserData!
  } */
/* let getUser = async function({ _id }) {
  const user = await User.findOne({ _id: _id });
  if (!user) {
    const error = new Error('User not found');
    throw error;
  }
  return user;  
}; */

/* const resolvers = {
  Query: {
    user: getUser
  }
}; */

exports.UserSchema = makeExecutableSchema({
  typeDefs: typeDefs
});
