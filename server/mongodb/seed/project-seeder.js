var Project = require('../models/project');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

company = '';
status = '';

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var projects = [
    new Project({
        title: 'Ecommerce',
        company_id: company,
        info: 'Big project',
        link: 'https://rozetka.com.ua/',
        status: status
    })
];

var done = 0;
for (var i = 0; i < projects.length; i++) {
    projects[i].save(function(err, result){
        done++;
        if (done === projects.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
