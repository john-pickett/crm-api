const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH");
    next();
  });

  app.listen(port, () => {
    console.log(`Server started up at ${port}`);
});

app.get('/', (req, res) => {
    console.log('/ get');
    res.send('server running');
})