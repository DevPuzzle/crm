module.exports = `
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

  input UserInputData {
    email: String!
    name: String
    password: String!
    company_name: String!
  }
`;