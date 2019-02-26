const {makeExecutableSchema} = require('graphql-tools');
const companyController = require('../../controllers/companyController');

const typeDefs = `
  type Company {
    _id: ID!
    name: String!
  }

  type Query {
    company: Company!
  }
`;

const resolvers = {
    Query: {
      company: (_, arg, req) => companyController.getCompany(req.companyId)
    }
  };

const CompanySchema =   makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

module.exports = CompanySchema;