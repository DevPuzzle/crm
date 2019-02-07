const validator = require('validator');
const Client = require('../mongodb/models/client');
const User = require('../mongodb/models/user');

const {checkAuth} = require('../helpers/helpers');

async function createClient({ clientInput }, req) {
  if(!req.isAuth) {
    const error = new Error('Not Authenticated!');
    error.status = 401;
    throw error;
  }
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

  const user = await User.findById({ _id: req.userId });
  const companyId = user.company_id;
  
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
  return { ...createdClient._doc };
}

async function updateClient({id, clientInput}, req) {
  checkAuth(req.isAuth);
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
  const client = await Client.findById({ _id: id });
  if (!client) {
    const error = new Error('No client found!');
    error.code = 404;
    throw error;
  }
  if (client._id.toString() !== id) {
    const error = new Error('No authorized!');
    error.code = 403;
    throw error;
  }
  client.name = clientInput.name;
  client.last_name = clientInput.last_name;
  client.email = clientInput.email;
  client.skype = clientInput.skype;
  client.comment = clientInput.comment;

  const updatedClient = await client.save();
  return {...updatedClient._doc, _id: updatedClient._id.toString()};
}

async function getClientById (_, {_id}, req) {
  try{
    const foundClient = await Client.findById(_id);
    return foundClient;
  }catch(err) {
    const error = new Error();
    error.data = 'Client was not found';
    error.code = 422;
    throw error;
  }
}

async function getClients(req) {
  checkAuth(req.isAuth);
  const clients = await Client.find({company_id: req.companyId});
  return clients;
}

async function deleteClient({id}, req) {
  if(!req.isAuth) {
    const error = new Error('Not Authenticated!');
    error.status = 401;
    throw error;
  }
  const client = await Client.findById(id);
  if(!client) {
    const error = new Error('No client found!');
    error.code = 404;
    throw error;
  }
  await Client.findByIdAndRemove(id);
  return true;
}

module.exports = {
    createClient: createClient,
    updateClient: updateClient,
    deleteClient: deleteClient,
    getClients: getClients,
    getClientById: getClientById
}