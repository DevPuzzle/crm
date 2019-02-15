const Platform = require('../mongodb/models/platform');
const Status = require('../mongodb/models/status');
const NotificationType = require('../mongodb/models/notification-type');

async function getPlatforms() {
    const platforms = await Platform.find();
    return platforms;
}
async function getStatuses() {
    const statuses = await Status.find();
    return statuses;
}
async function getNotTypes() {
    const notificationTypes = await NotificationType.find();
    return notificationTypes;
}

async function getNotType(typeId) {
  const notType = await NotificationType.findById(typeId);
  return notType;
}

async function getPlatform(platformId) {
    const platform = await Platform.findById(platformId);
    return platform;
  }

  async function getStatus(statusId) {
    const status = await Status.findById(statusId);
    return status;
  }  

module.exports = {
    getPlatforms: getPlatforms,
    getStatuses: getStatuses,
    getNotTypes: getNotTypes,
    getNotType: getNotType,
    getPlatform: getPlatform,
    getStatus: getStatus,
    getStatus: getStatus
  }