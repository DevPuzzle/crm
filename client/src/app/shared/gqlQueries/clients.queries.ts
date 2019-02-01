import gql from 'graphql-tag';

export const GET_CLIENTS_LIST = gql`
  query getClients{
    clients{
      _id
      name
      last_name
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query getClient($id: String!) {
    client(_id: $id){
      _id
      name
      last_name
      email
      skype
      comment
      company{
        _id
        name
      }
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation createClient($clientData: ClientInputData){
    createClient(clientInput: $clientData){
      _id
      name
      last_name
      email
      skype
      comment
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: String!, $clientData: ClientInputData){
    updateClient(id: $id, clientInput: $clientData){
      name
      last_name
      email
      skype
      comment
    }
  }
`;
