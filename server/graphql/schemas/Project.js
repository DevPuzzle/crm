const {makeExecutableSchema} = require('graphql-tools');
const projectController = require('../../controllers/projectController');
const companyController = require('../../controllers/companyController');
const typeController = require('../../controllers/typeController');
const employeeController = require('../../controllers/employeeController');
const clientController = require('../../controllers/clientController');

const typeDefs = `
    type Company {
      _id: ID!
      name: String!
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

    type Notification {
        type: NotificationType
        comment: String
        date: String
        time: String
    }

    input NotificationInputData {
        type: String
        comment: String
        date: String
        time: String
    }

    type Employee {
      _id: ID!
      email: String!
      name: String!
      last_name: String
      skills: String
      company: Company
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

    type Project {
      _id: ID!
      title: String!
      client: Client
      employee: Employee
      company: Company
      platform: Platform
      info: String
      link: String
      status: Status
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
        type: String
        comment: String
        date: String
        time: String
    }

    type Query {
      project(_id: String!): Project!
      projects: [Project]!
      projectsByEmployee(_id: String!): [Project]!
      projectsByClient(_id: String!): [Project]!
    }

    type Mutation {
      createProject(projectInput: ProjectInputData): Project!
      updateProject(id: String!, projectInput: ProjectInputData): Project!
      deleteProject(id: ID!): Boolean
    }
`;

const resolvers = {
    Project: {
      company: (project) => companyController.getCompany(project.company_id),
      platform: (project) => typeController.getPlatform(project.platform),
      status: (project) => typeController.getStatus(project.status),
      employee : (project) => {
        let _id = project.employee;
        return employeeController.getEmployeeById('', {_id}, '');
      },
      client: (project) => {
        let _id = project.client;
        return clientController.getClientById('', {_id}, '');
      }

    },
    Notification: {
      type: (project) => typeController.getNotType(project.type),
    },
    Query: {
      project: projectController.getProjectById,
      projects: (_, args, req) => projectController.getProjects(req),
      projectsByEmployee: (_, _id, req) => {
        return projectController.getProjectsByEmployeeId({_id}, req);
      },
      projectsByClient: (_, _id, req) => {
        return projectController.getProjectsByClientId({_id}, req);
      }
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