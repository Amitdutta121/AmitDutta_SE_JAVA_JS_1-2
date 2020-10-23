const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const ProductsRoute = require('./routes/product')
const UsersRoute = require('./routes/user')


var app = express();

//CORS support
app.use(cors())
//GET JSON data
app.use(bodyParser.json());

//all High level routes
app.use('/products', ProductsRoute);
app.use('/user', UsersRoute);


//listen port Default:2999
app.listen(2999);