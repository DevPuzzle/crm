var Project = require('../models/project');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var projects = [
    new Project({
        title: 'Ecommerce',
        client: '5c52cb02db27c34120d32bdf',
        employee: '5c4ac8aa7b5b7705adab75d4',
        company_id: '5c4c6fcc15e5681c509e3239',
        platform: '5c5954b1a5cb1f1dd60aab45',
        info: 'Big project',
        link: 'https://rozetka.com.ua/',
        status: '5c59569ee2fe741e823d50b7',
        notification: {
            type: 'to call',
            comment: 'say about money',
            date: '2019,11,10,14,05'
        }
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
