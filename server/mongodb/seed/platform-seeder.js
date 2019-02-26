var Platform = require('../models/platform');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var platforms = [
    new Platform({
        name: 'Upwork'
    }),
    new Platform({
        name: 'Freelance'
    }),
    new Platform({
        name: 'Other'
    })
];

var done = 0;
for (var i = 0; i < platforms.length; i++) {
    platforms[i].save(function(err, result){
        done++;
        if (done === platforms.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
