const userRes = require('./user');
const signRes = require('./sign');
const employeeRes = require('./employee');

const rootResolver = {
    ...userRes,
    ...signRes,
    ...employeeRes
};

module.exports = rootResolver;