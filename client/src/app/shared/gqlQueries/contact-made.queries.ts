import gql from 'graphql-tag';

export const GET_DATA_FOR_SELECT = gql`
  query {
    employees: employees{
      email
      name
      last_name
    }

    clients: clients{
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
