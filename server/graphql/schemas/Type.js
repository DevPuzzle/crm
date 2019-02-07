const {makeExecutableSchema} = require('graphql-tools');
const typeController = require('../../controllers/typeController');

const typeDefs = `
  type Platform {
    _id: ID!
    name: String!
  }

  type Status {
    _id: ID!
    name: String!
  }

  type NotificationType {
    _id: ID!
    name: String!
  }

   type Query {
    platforms: [Platform]!
    statuses: [Status]!
    not_types: [NotificationType]!
   }
`;

const resolvers = {
  Query: {
    platforms: (_, args, req) => typeController.getPlatforms(),
    statuses: (_, args, req) => typeController.getStatuses(),
    not_types: (_, args, req) => typeController.getNotTypes()
  },
};

exports.TypeSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });