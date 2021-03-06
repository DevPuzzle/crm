const { mergeSchemas } = require('graphql-tools');

const {UserSchema} = require('./User');
const {AuthSchema} = require('./Auth');
const {EmployeeSchema} = require('./Employee');
const {ClientSchema} = require('./Client');
const {ProjectSchema} = require('./Project');
const {TypeSchema} = require('./Type');
const CompanySchema = require('./Company');
const {CoverLetterSchema} = require('./CoverLetter');


const schemas = [];
schemas.push(UserSchema, AuthSchema, EmployeeSchema, CompanySchema, ClientSchema, ProjectSchema, TypeSchema, CoverLetterSchema);

module.exports = mergeSchemas({
  schemas: schemas
});