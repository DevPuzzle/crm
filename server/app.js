const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schemas/index');
const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

const app = express();

app.use(bodyParser.json()); 
app.use(cors);
app.use(auth);
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
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

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-tivpd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`).then(result => {
    console.log('connected !!!');
    app.listen(8080);
}).catch(err => {
    console.log(err);
});


