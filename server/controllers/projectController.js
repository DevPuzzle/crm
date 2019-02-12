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

    let DateTime;
    if (projectInput.date === undefined) {
      DateTime = undefined;
    } else {
      const newDate = new Date(projectInput.date);
      DateTime = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), projectInput.time);
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
          date: DateTime
        }
    });

    const createdProject = await project.save();
    return { ...createdProject._doc };
  }
async function updateProject({ clientInput }, req) {}
async function getProjects({ clientInput }, req) {}
async function getProjectById({ clientInput }, req) {}

async function getAllData(req) {
  checkAuth(req.isAuth);
  
  const user = await User.findById('5c45a3cadcb89f0c2e23a692');
  const employees = await Employee.find({company_id: user.company_id});
  const clients = await Client.find({company_id: user.company_id});
  const platforms = await Platform.find();
  const notificationTypes = await NotificationType.find();
  const statuses = await Status.find();

  const allData = {
    employees: employees,
    clients: clients,
    platforms: platforms,
    statuses: statuses,
    not_types: notificationTypes
};

  // console.log('\r\n', '<<___allData___>>','\r\n','\r\n', allData);
  return allData;

}

  module.exports = {
    createProject: createProject,
    updateProject: updateProject,
    getProjects: getProjects,
    getProjectById: getProjectById,
    getAllData: getAllData
}