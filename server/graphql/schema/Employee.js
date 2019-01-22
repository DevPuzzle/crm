module.exports = `
  type Employee {
    _id: ID!
    email: String!
    name: String!
    last_name: String
    skills: String
    company_id: String!
  }

  input EmployeeInputData {
    email: String!
    name: String!
    last_name: String
    skills: String
  }
`;