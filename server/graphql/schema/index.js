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
`);