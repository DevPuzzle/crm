const {makeExecutableSchema} = require('graphql-tools');
const companyController = require('../../controllers/companyController');

const typeDefs = `
  type Company {
    _id: ID!
    name: String!
  }

  type Query {
    company(_id: String!): Company!
  }
`;

const resolvers = {
    Query: {
      company: companyController.getCompany
    }
  };

const CompanySchema =   makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

module.exports = CompanySchema;