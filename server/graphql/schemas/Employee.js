const {makeExecutableSchema} = require('graphql-tools');
const employeeController = require('../../controllers/employeeController');

const typeDefs = `
  type Company {
    _id: ID!
    name: String!
  }

  type Employee {
    _id: ID!
    email: String!
    name: String!
    last_name: String
    skills: String
    company: Company
  }

  input EmployeeInputData {
    email: String!
    name: String!
    last_name: String
    skills: String
  }

  type Query {
    employee(_id: String!): Employee!
    employees: [Employee]!
  }

  type Mutation {
    createEmployee(employeeInput: EmployeeInputData): Employee!
  }
`;

const resolvers = {
  Query: {
    employee: employeeController.getEmployeeById,
    employees: (_, args, req) => employeeController.getEmployees(req)
  },
  Mutation: {
    createEmployee: (_, employeeInput, req) => {
      return employeeController.createEmployee(employeeInput, req);
    }
  }
};

exports.EmployeeSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});