const validator = require('validator');
const Project = require('../mongodb/models/project');
const Employee = require('../mongodb/models/employee');
const Client = require('../mongodb/models/client');
const Platform = require('../mongodb/models/platform');
const Status = require('../mongodb/models/status');
const NotificationType = require('../mongodb/models/notification-type');
const User = require('../mongodb/models/user');

const {checkAuth} = require('../helpers/helpers');

async function createProject({ projectInput }, req) {

    checkAuth(req.isAuth);

    const errors = [];
    
    if (validator.isEmpty(projectInput.title)) {
      errors.push({message: 'title required'});
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

    const project = new Project({
        title: projectInput.title,
        info: projectInput.info,
        link: projectInput.link,
        platform: projectInput.platform,
        employee: projectInput.employee,
        client: projectInput.client,
        company_id: companyId,
        status: projectInput.status,
        notification: {
          type: projectInput.type,
          comment: projectInput.comment,
          date: projectInput.date,
          time: projectInput.time
        }
    });

    const createdProject = await project.save();
    return { ...createdProject._doc };
  }
async function updateProject({id, projectInput}, req) {

    checkAuth(req.isAuth);
    const errors = [];
    
    if (validator.isEmpty(projectInput.title)) {
      errors.push({message: 'title required'});
    }
    
  const project = await Project.findById({ _id: id });
  if (!project) {
    const error = new Error('No project found!');
    error.code = 404;
    throw error;
  }
  if (project._id.toString() !== id) {
    const error = new Error('No authorized!');
    error.code = 403;
    throw error;
  }
  const user = await User.findById({ _id: req.userId });
  const companyId = user.company_id;
  
  if(user === null || companyId === null) {
      errors.push({message: 'User or company not found'});
  }
  
  let testDate = new Date(projectInput.date);
 
  console.log('testDate/toLocalString', testDate.toLocalString());

  project.title = projectInput.title;
  project.info = projectInput.info;
  project.link = projectInput.link;
  project.platform = projectInput.platform;
  project.employee = projectInput.employee;
  project.client = projectInput.client;
  project.company_id = companyId;
  project.status = projectInput.status;

  if(projectInput.type) {
    project.notification = {
      type: projectInput.type,
      comment: projectInput.comment,
      date: projectInput.date,
      time: projectInput.time
    }
  } else {
    if (project.notification) {
      for ( var i in project.notification ) {
            delete project.notification[i];
    }
      project.notification = undefined;
    }
  }

  const updatedProject = await project.save();
  return {...updatedProject._doc, _id: updatedProject._id.toString()};
}
async function getProjectById({ _id }, req) {}
async function getProjects(req) {
  checkAuth(req.isAuth);
  
  const projects = await Project.find({company_id: req.companyId});
  return projects;
}
async function getProjectsByEmployeeId({_id},req) {
  checkAuth(req.isAuth);
  const projects = await Project.find({employee: _id});
  // console.log('___________id form getProjectsByEmployeeId___________', _id);
  return projects;
}

async function getProjectsByClientId({_id},req) {
  checkAuth(req.isAuth);
  const projects = await Project.find({client: _id});
  return projects;
}

async function deleteProject({id}, req) {
  checkAuth(req.isAuth);

  if(!req.isAuth) {
    const error = new Error('Not Authenticated!');
    error.status = 401;
    throw error;
  }

  const project = await Project.findById(id);
  if(!project) {
    const error = new Error('No project found!');
    error.code = 404;
    throw error;
  }

  await Project.findByIdAndRemove(id);
  return true;
}

  module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    getProjects: getProjects,
    getProjectById: getProjectById,
    getProjectsByEmployeeId: getProjectsByEmployeeId,
    getProjectsByClientId: getProjectsByClientId,
    deleteProject: deleteProject
}