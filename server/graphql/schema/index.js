const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        company_id: String!
    }

    type UserData {
        status: String
        email: String!
        name: String!
        company_id: String!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserInputData {
        email: String!
        name: String
        password: String!
        company_name: String!
    }

    type RootQuery {
        getUser(_id: String!): UserData!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);