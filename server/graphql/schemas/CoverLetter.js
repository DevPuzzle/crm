const {makeExecutableSchema} = require('graphql-tools');
const companyController = require('../../controllers/companyController');
const coverLetterController = require('../../controllers/coverLetterController');


const typeDefs = `
  type Company {
    _id: ID!
    name: String!
  }

  type Letter {
    _id: ID!  
    text: String
  }

  input inputLetter {
    _id: ID
    text: String
  } 

  type CoverLetter {
    _id: ID!
    title: String!
    company: Company
    letters: [Letter]
  }

  input CoverLetterInputData {
    _id: ID
    title: String!
    letters: [inputLetter]
  }

  type Query {
    coverLetter(_id: String!): CoverLetter!
    coverLetters: [CoverLetter]!
  }

  type Mutation {
    createCoverLetter(coverLetterInput: CoverLetterInputData): CoverLetter!
    updateCoverLetter(id: String!, coverLetterInput: CoverLetterInputData): CoverLetter!
    deleteCoverLetter(id: ID!): Boolean
    deleteCoverField(id: ID!, fieldId: ID!): Boolean
  }
`;

const resolvers = {
  CoverLetter: {
    company: (coverLetter) => companyController.getCompany(coverLetter.company_id)
  },
  Query: {
    coverLetter: coverLetterController.getCoverLetterById,
    coverLetters: (_, args, req) => coverLetterController.getCoverLetters(req)
  },
  Mutation: {
    createCoverLetter: (_, coverLetterInput, req) => {
      return coverLetterController.createCoverLetter(coverLetterInput, req);
    },
    updateCoverLetter: (_, inputData, req) => {
        return coverLetterController.updateCoverLetter(inputData, req);
      },
    deleteCoverLetter: (_, id, req) => {
    return coverLetterController.deleteCoverLetter(id, req);
    },
    deleteCoverField: (_, id, req) => {
        return coverLetterController.deleteCoverField(id, req);
    }
  }
};

exports.CoverLetterSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});