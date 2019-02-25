const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const port = process.env.PORT || 6500;

const app = express();

massive( process.env.CONNECTION_STRING ).then( dbInstance => {
    app.set('db', dbInstance)
  }).catch( err => console.log(err) );

app.use(bodyParser.json());

app.listen(port, ()=> console.log(`Listening on port ${port}`));