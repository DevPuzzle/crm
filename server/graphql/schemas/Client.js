const {makeExecutableSchema} = require('graphql-tools');
const clientController = require('../../controllers/clientController');
const companyController = require('../../controllers/companyController');
const Company = require('../../mongodb/models/company');

const typeDefs = `
  type Company {
    _id: ID!
    name: String!
  }

  type Client {
    _id: ID!
    name: String!
    last_name: String!
    email: String!
    skype: String!
    comment: String!
    company: Company
  }

  input ClientInputData {
    name: String!
    last_name: String
    email: String!
    skype: String!
    comment: String!
  }

  type Mutation {
    createClient(clientInput: ClientInputData): Client!
  }
`;

const resolvers = {
    Mutation: {
      createCLient: (_, employeeInput, req) => {
        return employeeController.createEmployee(employeeInput, req);
      }
    }
  };

  exports.ClientSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });