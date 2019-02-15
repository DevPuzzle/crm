import gql from 'graphql-tag';

export const GET_PROJECTS = gql`
  query getClients{
    projects{
      _id
      title
      client {
        _id
        name
        last_name
      }
      employee {
        _id
        name
        last_name
      }

      platform {
        _id
        name
      }
      info
      link
      status {
        _id
        name
      }
      notification{
        type {
          _id
          name
        }
        date
        comment
        time
      }
      company {
        _id
        name
      }
    }
  }
`;

export const GET_PROJECTS_BY_EMPLOYEE = gql`
  query projectsByEmployee($id: String!) {
    projectsByEmployee(_id: $id) {
      _id
      title
      client {
        _id
        name
        last_name
      }
      employee {
        _id
        name
        last_name
      }

      platform {
        _id
        name
      }
      info
      link
      status {
        _id
        name
      }
      notification{
        type {
          _id
          name
        }
        date
        comment
      }
      company {
        _id
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($projectData: ProjectInputData){
    createProject(projectInput: $projectData){
      _id
      client {
        name
      }
      employee {
        name
      }
      platform {
        name
      }
      status {
        name
      }
      title
      link
      info
      notification {
        type {
          _id
          name
        }
        comment
        date
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: String!, $projectData: ProjectInputData){
    updateProject(id: $id, projectInput: $projectData){
      client {
        name
      }
      employee {
        name
      }
      platform {
        name
      }
      status {
        name
      }
      title
      link
      info
      notification {
        type {
          _id
          name
        }
        comment
        date
      }
    }
  }
`;

export const GET_DATA_FOR_SELECT = gql`
  query {
    employees: employees{
      _id
      email
      name
      last_name
    }

    clients: clients{
      _id
      name
      last_name
      email
    }

    platforms: platforms{
      _id
      name
    }

    statuses: statuses{
      _id
      name
    }

    not_types: not_types{
      _id
      name
    }
  }
`;
