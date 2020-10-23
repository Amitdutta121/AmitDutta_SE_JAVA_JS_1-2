const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const mysqlConnection = require('./connection');
const ProductsRoute = require('./routes/product')


var app = express();


app.use(bodyParser.json());


app.use('/products', ProductsRoute);




app.listen(2999);