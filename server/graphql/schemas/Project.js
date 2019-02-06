const {makeExecutableSchema} = require('graphql-tools');
const projectController = require('../../controllers/projectController');
const companyController = require('../../controllers/companyController');
const employeeController = require('../../controllers/employeeController');
const clientController = require('../../controllers/clientController');
const Platform = require('../../mongodb/models/platform');
const Status = require('../../mongodb/models/status');
const NotificationType = require('../../mongodb/models/notification-type');



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

    type Employee {
      _id: ID!
      email: String!
      name: String!
      last_name: String
      skills: String
      company: Company
    }

    type Notification {
        type: String
        comment: String
        date: String
        time: String
    }

    extend type Client {
      _empty: String
    } 

    input NotificationInputData {
        type: String
        comment: String
        date: String
        hours: String
        minutes: String
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

    type AllData {
      clients: [Client]
      employees: [Employee]
      platforms: [Platform]
      statuses: [Status]
      not_types: [NotificationType]
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
      getAllData: AllData!
    }

    type Mutation {
      createProject(projectInput: ProjectInputData): Project!
      updateProject(id: String!, projectInput: ProjectInputData): Project!
      deleteProject(id: ID!): Boolean
    }
`;

const resolvers = {
    AllData: {
      
      clients: (project) => clientController.getClients(project),
      employees: (project) => employeeController.getEmployees(project),
      platforms: async (project) => await Platform.find(),
      statuses: async(project) => await Status.find(),
      not_types: async (project) => await NotificationType.find()
    },
    Project: {
      company: (project) => companyController.getCompany(project.company_id),
      notification: (project) => companyController.getCompany(project.company_id)
    },
    Query: {
      project: projectController.getProjectById,
      projects: (_, args, req) => projectController.getProjects(req),
      getAllData: (_, args, req) => projectController.getAllData(req)
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