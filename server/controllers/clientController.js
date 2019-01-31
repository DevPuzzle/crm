const validator = require('validator');
const Client = require('../mongodb/models/client');
const User = require('../mongodb/models/user');

const {checkAuth} = require('../helpers/helpers');

async function createClient({ clientInput }, req) {
    // checkAuth(req.isAuth);
    const errors = [];
    
    if (!validator.isEmail(clientInput.email)) {
      errors.push({message: 'E-mail is invalid'});
    }
    if (validator.isEmpty(clientInput.email)) {
      errors.push({message: 'E-mail required'});
    }
    if (validator.isEmpty(clientInput.name)) {
      errors.push({message: 'Name required'});
    }
    const user = await User.findById({ _id: '5c45e7e893d7c013fa02d9c3' });
    const companyId = '5c45a3cadcb89f0c2e23a691';
  
    if(user === null || companyId === null) {
        errors.push({message: 'User or company not found'});
    }
  
    if (errors.length > 0) {
      const error = new Error(errors);
      error.data = errors;
      error.code = 422;
      console.log(error);
      throw error;
    }
    
    const client = new Client({
        name: clientInput.name,
        last_name: clientInput.last_name,
        email: clientInput.email,
        skype: clientInput.skype,
        comment: clientInput.comment,
        company_id: companyId
    });
    const createdClient = await client.save();
    console.log('User ', client.name, ' CREATED!!!');
    return { ...createdClient._doc };
    
  }
  async function getClients(req) {

  }

module.exports = {
    createClient: createClient,
    getClients: getClients
}