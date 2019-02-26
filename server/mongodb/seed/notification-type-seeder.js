var NotificationType = require('../models/notification-type');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var notificationTypes = [
    new NotificationType({
        name: 'email'
    }),
    new NotificationType({
        name: 'phone'
    })
];

var done = 0;
for (var i = 0; i < notificationTypes.length; i++) {
    notificationTypes[i].save(function(err, result){
        done++;
        if (done === notificationTypes.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
