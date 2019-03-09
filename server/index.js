const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const massive = require('massive');
const path = require('path')
require('dotenv').config({path : path.join(__dirname, '.env')});

const productsController = require('./controller');


const {
    PORT,
    CONNECTION_STRING
} = process.env;

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());


//Database Connection
massive(CONNECTION_STRING, { scripts: __dirname + '/db'} ).then( dbInstance => {
    app.set('db', dbInstance)
  }).catch( err => console.log(err) );

//Product table end-points
app.get('/api/inventory', productsController.getAll);
app.get('/api/inventory/:id', productsController.getOne);
app.put('/api/inventory/:id', productsController.update);
app.post('/api/inventory', productsController.create);
app.delete('/api/inventory/:id', productsController.delete);

//Server port
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));