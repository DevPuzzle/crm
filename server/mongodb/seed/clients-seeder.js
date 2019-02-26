var CLient = require('../models/client');
const mongoose = require('mongoose');
// const nodemon = require('../../nodemon');
const nodemon = require('../../nodemon');
const company = '';

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var employees = [
    new Client({
        name: 'Dexter',
        last_name: 'Round',
        email: 'dexter@gmail.com',
        skype: 'Dexter753',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skype: 'macDonald3124',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Curtis',
        last_name: 'Cook',
        email: 'curtis@gmail.com',
        skype: 'cook331',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skype: '',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Constance',
        last_name: 'London',
        email: 'constance@gmail.com',
        skype: 'constance156',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skype: '',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Elvin',
        last_name: 'Thomas',
        email: 'thomas@gmail.com',
        skype: 'Elvin31',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Agatha',
        last_name: 'MacDonald',
        email: 'agatamac@gmail.com',
        skype: '',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
    new Client({
        name: 'Kent',
        last_name: 'Peacock',
        email: 'peacock@gmail.com',
        skype: 'peacock.123',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        company_id: company
    }),
];

var done = 0;
for (var i = 0; i < employees.length; i++) {
    employees[i].save(function(err, result){
        done++;
        if (done === employees.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

