import gql from 'graphql-tag';

export const GET_EMPLOYEES_LIST = gql`
  query getEmployees{
    employees{
      _id
      email
      name
      last_name
      skills
      company_id
    }
  }
`;
