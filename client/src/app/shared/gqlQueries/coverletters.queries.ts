import gql from 'graphql-tag';

export const GET_COVERLETTER_LIST = gql`
  query getCoverLetters{
    coverLetters{
      _id
      title
      letters {
        _id
        text
      }
    }
  }
`;

export const GET_COVERLETTER_BY_ID = gql`
  query getCoverLetter($id: String!) {
    coverLetter(_id: $id){
      _id
      title
      letters {
        _id
        text
      }
    }
  }
`;

export const CREATE_COVERLETTER = gql`
  mutation createCoverLetter($CoverLetterData: CoverLetterInputData){
    createCoverLetter(coverLetterInput: $CoverLetterData){
      _id
      title
      letters {
        text
      }
    }
  }
`;

export const UPDATE_COVERLETTER = gql`
  mutation updateCoverLetter($id: String!, $coverLetterData: CoverLetterInputData){
    updateCoverLetter(id: $id, coverLetterInput: $coverLetterData){
      title
      letters {
        text
      }
    }
  }
`;
