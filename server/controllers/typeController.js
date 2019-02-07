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

module.exports = {
    getPlatforms: getPlatforms,
    getStatuses: getStatuses,
    getNotTypes: getNotTypes
  }