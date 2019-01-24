import gql from 'graphql-tag';

export const SIGN_IN_USER = gql`
  query SignInUser($email: String!, $password: String!) {
    login(email: $email, password: $password){
      userId
      token
    }
  }
`;
