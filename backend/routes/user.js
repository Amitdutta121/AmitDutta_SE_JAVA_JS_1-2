const express = require('express');
const Router = express.Router();
const knex = require('knex')(require('../knexfile'))
const validator = require('validator');

Router.post('/auth', (req, res)=>{
    knex('users').where({
        username: req.body.username,
        password:  req.body.password
      }).select('type').then((data)=>{
          res.json({
              msg: "success",
              type:data[0].type
          });
      })
      
})

module.exports = Router;