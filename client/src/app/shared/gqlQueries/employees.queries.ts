import gql from 'graphql-tag';

export const GET_EMPLOYEES_LIST = gql`
  query getEmployees{
    employees{
      _id
      name
      last_name
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query getEmployees($id: String!) {
    employee(_id: $id){
      _id
      email
      name
      last_name
      skills
      company{
        _id
        name
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($emmployeeData: EmployeeInputData){
    createEmployee(employeeInput: $emmployeeData){
      _id
      email
      name
      last_name
      skills
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($emmployeeData: EmployeeInputData){
    updateEmployee(employeeInput: $emmployeeData){
      email
      name
      last_name
      skills
    }
  }
`;


