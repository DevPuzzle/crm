var CoverLetter = require('../models/coverLetter');
const mongoose = require('mongoose');
const nodemon = require('../../nodemon');

mongoose.connect(`mongodb+srv://${nodemon.env.MONGO_USER}:${nodemon.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${nodemon.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected from seed');
}).catch(err => {
    console.log(err);
});

var coverLetters = [
    new CoverLetter({
        title: 'New Cover',
        company_id: '5c45a3cadcb89f0c2e23a691',
        letters: 
        [
          {text: 'Lorem ipsum 1'},
          {text: 'Lorem ipsum 2'},
          {text: 'Lorem ipsum 3'},
          {text: 'Lorem ipsum 4'}
        ]
    })
];

var done = 0;
for (var i = 0; i < coverLetters.length; i++) {
    coverLetters[i].save(function(err, result){
        done++;
        if (done === coverLetters.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
