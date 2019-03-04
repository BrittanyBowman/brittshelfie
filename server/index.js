//Require packages

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const massive = require('massive');
const path = require('path')
require('dotenv').config({path : path.join(__dirname, '.env')});

// console.log(__dirname);
// console.log(path.join(__dirname, '.env'));
// console.log(path.join(__dirname, '../src'));
// console.log(__dirname + '/../src');
// console.log(process.cwd());

//Controllers
 const productsController = require('./controller');


//Destruct variables from .env HERE

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
app.get('/api/products', productsController.getAll);
app.get('/api/products/:id', productsController.getOne);
app.put('/api/products/:id', productsController.update);
app.post('/api/products', productsController.create);
app.delete('/api/products/:id', productsController.delete);

//Server port
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));