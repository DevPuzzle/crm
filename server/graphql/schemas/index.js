const { mergeSchemas } = require('graphql-tools');

const {UserSchema} = require('./User');
const {AuthSchema} = require('./Auth');
const {EmployeeSchema} = require('./Employee');

const schemas = [];
schemas.push(UserSchema, AuthSchema, EmployeeSchema);

module.exports = mergeSchemas({
  schemas: schemas
});