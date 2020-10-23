const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const ProductsRoute = require('./routes/product')
const UsersRoute = require('./routes/user')


var app = express();

app.use(cors())
app.use(bodyParser.json());


app.use('/products', ProductsRoute);
app.use('/user', UsersRoute);



app.listen(2999);