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

  type Query {
    client(_id: String!): Client!
    clients: [Client]!
  }

  type Mutation {
    createClient(clientInput: ClientInputData): Client!
    updateClient(id: String!, clientInput: ClientInputData): Client!
    deleteClient(id: ID!): Boolean
  }
`;

const resolvers = {
    Client: {
        company: (client) => companyController.getCompany(client.company_id)
      },
    Query: {
        client: clientController.getClientById,
        clients: (_, args, req) => clientController.getClients(req)
      },
    Mutation: {
      createClient: (_, clientInput, req) => {
        // console.log(clientInput);
        return clientController.createClient(clientInput, req);
      },
      updateClient: (_, inputData, req) => {
        return clientController.updateClient(inputData, req);
      },
      deleteClient: (_, id, req) => {
        return clientController.deleteClient(id, req);
      }
    }
  };

  exports.ClientSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });