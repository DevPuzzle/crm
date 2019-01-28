const { mergeSchemas } = require('graphql-tools');

const {UserSchema} = require('./User');
const {AuthSchema} = require('./Auth');
const {EmployeeSchema} = require('./Employee');
const CompanySchema = require('./Company');

const schemas = [];
schemas.push(UserSchema, AuthSchema, EmployeeSchema, CompanySchema);

module.exports = mergeSchemas({
  schemas: schemas
});