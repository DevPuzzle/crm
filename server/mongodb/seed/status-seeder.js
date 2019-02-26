var Status = require('../models/status');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var statuses = [
    new Status({
        name: 'finished'
    }),
    new Status({
        name: 'in dev'
    }),
    new Status({
        name: 'discussed'
    }),
];

var done = 0;
for (var i = 0; i < statuses.length; i++) {
    statuses[i].save(function(err, result){
        done++;
        if (done === statuses.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

