const {makeExecutableSchema} = require('graphql-tools');
const projectController = require('../../controllers/projectController');
const companyController = require('../../controllers/companyController');


const typeDefs = `
    type Company {
      _id: ID!
      name: String!
    }

    type Notification {
        type: String
        comment: String
        date: String
    }

    input NotificationInputData {
        type: String
        comment: String
        date: String
    }

    type Project {
      _id: ID!
      title: String!
      client: String
      employee: String
      company: Company
      platform_id: String
      info: String
      link: String
      status: String
      notification: Notification
    }

    input ProjectInputData {
        title: String!
        client: String
        employee: String
        platform: String
        info: String
        link: String
        status: String
        notification: NotificationInputData
    }

    type Query {
      project(_id: String!): Project!
      projects: [Project]!
    }

    type Mutation {
      createProject(projectInput: ProjectInputData): Project!
      updateProject(id: String!, projectInput: ProjectInputData): Project!
      deleteProject(id: ID!): Boolean
    }
`;

const resolvers = {
    Project: {
      company: (project) => companyController.getProject(project.company_id)
    },
    Query: {
      project: projectController.getProjectById,
      projects: (_, args, req) => projectController.getProjects(req)
    },
    Mutation: {
      createProject: (_, projectInput, req) => {
        return projectController.createProject(projectInput, req);
      },
      updateProject: (_, inputData, req) => {
        return projectController.updateProject(inputData, req);
      },
      deleteProject: (_, id, req) => {
        return projectController.deleteProject(id, req);
      }
    }
  };

  exports.ProjectSchema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
  });