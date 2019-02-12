import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject($projectData: ProjectInputData){
    createProject(projectInput: $projectData){
      _id
      client
      employee
      platform
      title
      link
      info
      notification {
        type
        comment
        date
        time
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
