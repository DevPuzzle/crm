const {makeExecutableSchema} = require('graphql-tools');
const projectController = require('../../controllers/projectController');
const companyController = require('../../controllers/companyController');
const employeeController = require('../../controllers/employeeController');
const clientController = require('../../controllers/clientController');


const typeDefs = `
    type Company {
      _id: ID!
      name: String!
    }


    type Notification {
        type: String
        comment: String
        date: String
        time: String
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
      platform: String
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


// """
// type AllData {
//   platforms: [Platform]
//   statuses: [Status]
//   not_types: [NotificationType]
// }
// """

const resolvers = {
    //AllData: {
      // company: (project) => companyController.getCompany(project.company_id),
      // clients: (project) => clientController.getClients(project.company_id),
      // employees: (project) => employeeController.getEmployees(project.company_id),
      //platforms: async (project) => await Platform.find(),
     // statuses: async(project) => await Status.find(),
      //not_types: async (project) => await NotificationType.find()
   // },
    Project: {
      company: (project) => {
        console.log('project', project);
        companyController.getCompany(project.company_id)
      },
      notification: (project) => companyController.getCompany(project.company_id)
    },
    Query: {
      project: projectController.getProjectById,
      projects: (_, args, req) => projectController.getProjects(req),
      // getAllData: (_, args, req) => projectController.getAllData(req)
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