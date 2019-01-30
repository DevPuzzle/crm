const {makeExecutableSchema} = require('graphql-tools');
const employeeController = require('../../controllers/employeeController');
const companyController = require('../../controllers/companyController');
const Company = require('../../mongodb/models/company');

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
    updateEmployee(id: String!, employeeInput: EmployeeInputData): Employee!
  }
`;

const resolvers = {
  Employee: {
    company: (employee) => companyController.getCompany(employee.company_id)
  },
  Query: {
    employee: employeeController.getEmployeeById,
    employees: (_, args, req) => employeeController.getEmployees(req)
  },
  Mutation: {
    createEmployee: (_, employeeInput, req) => {
      return employeeController.createEmployee(employeeInput, req);
    },
    updateEmployee: (_, inputData, req) => {
      return employeeController.updateEmployee(inputData, req);
    }
  }
};

async function companyByEmployee(companyId) {
  const company = await Company.findById(companyId);
  return company;
}

exports.EmployeeSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});