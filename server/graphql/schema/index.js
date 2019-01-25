const { mergeSchemas } = require('graphql-tools');

const {UserSchema} = require('../types/User');
const {AuthSchema} = require('../types/Auth');
const {EmployeeSchema} = require('../types/Employee');

const schemas = [];
schemas.push(UserSchema, AuthSchema, EmployeeSchema);

module.exports = mergeSchemas({
  schemas: schemas
});
/* 
const { buildSchema } = require('graphql');
const UserTypes = require('./User');
const EmployeeTypes = require('./Employee');
const AuthTypes = require('./Auth');

module.exports = buildSchema(`
    ${UserTypes}
    ${EmployeeTypes}
    ${AuthTypes}
    
    type RootQuery {
        getUser(_id: String!): UserData!
        employees: [Employee]!
        employee(_id: String!): Employee!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createEmployee(employeeInput: EmployeeInputData): Employee!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`); */