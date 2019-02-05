const { mergeSchemas } = require('graphql-tools');

const {UserSchema} = require('./User');
const {AuthSchema} = require('./Auth');
const {EmployeeSchema} = require('./Employee');
const {ClientSchema} = require('./Client');
const {ProjectSchema} = require('./Project');
const CompanySchema = require('./Company');

const schemas = [];
schemas.push(UserSchema, AuthSchema, EmployeeSchema, CompanySchema, ClientSchema, ProjectSchema);

module.exports = mergeSchemas({
  schemas: schemas
});