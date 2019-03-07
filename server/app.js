const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schemas/index');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');
const path = require('path');
const keys = require('./config/keys');

const app = express();
console.log('test') 
app.use(bodyParser.json()); 
app.use(cors);
app.use(auth);
app.use('/', express.static(path.join(__dirname, 'angular')));
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      console.log(err);
      const data = err.originalError.data;
      const message = err.message || 'An error occurred';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    }
  })
);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(`mongodb+srv://${keys.MONGO_USER}:${keys.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${keys.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected !!!');
    app.listen(process.env.PORT || 80);
}).catch(err => {
    console.log(err);
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
 });


