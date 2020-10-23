const express = require('express');
const Router = express.Router();
const knex = require('knex')(require('../knexfile'))
const validator = require('validator');




Router.get('/', (req, res)=>{
    knex.select().from('products').then((data)=>{
        res.json({
            msg:"success",
            data:data
        });
    })
})

Router.get('/singleProduct/:id', (req, res)=>{

    knex('products').where('id', req.params.id).then((data)=>{
        res.json({
            msg:"success",
            data: data
        })
    })
})

Router.delete('/:id', (req, res)=>{
    knex('products')
    .where('id', req.params.id)
    .del().then(()=>{
        knex.select().from('products').then((data)=>{
            res.json({
                msg:"success",
                data:data
            });
        })
    })
})

Router.post('/addProduct',(req, res)=>{
    if(req.body.hasOwnProperty('config')){
        if(req.body.config.hasOwnProperty("username") && req.body.config.hasOwnProperty("password")){
        knex('users').where({
            username: req.body.config.username,
            password:  req.body.config.password
          }).select('type').then((data)=>{
              if(data.length > 0 && data[0].type == 'admin'){
                knex('products').insert({product_name: req.body.name, 
                    product_price:req.body.price, 
                    profit_percentage:req.body.profit, 
                    product_type: req.body.category }).then((data)=>{
                        res.json({
                            msg: "Successfully Added",
                            data : req.body
                        })
                    })
              }
              else{
                res.json({
                    msg:"Access Denied"
                });
              }
              
          })
        }else{
            res.json({
                msg:"Access Denied"
            });
        }
    }else{
        res.json({
            msg:"Access Denied"
        });
    }
    
})

Router.post('/editProduct/:id', (req, res)=>{

    if(req.body.hasOwnProperty('config')){
        if(req.body.config.hasOwnProperty("username") && req.body.config.hasOwnProperty("password")){
        knex('users').where({
            username: req.body.config.username,
            password:  req.body.config.password
          }).select('type').then((data)=>{
              if(data.length > 0 && data[0].type == 'admin'){
                knex('products')
                        .where({ id: req.params.id })
                        .update({
                            product_name: req.body.name,
                            product_price: req.body.price,
                            profit_percentage:req.body.profit,
                            product_type: req.body.category
                    }).then((data)=>{
                        res.json({
                            msg: "success",
                            data : "Successfully Updated"
                        })
                    }) 
              }
              else{
                res.json({
                    msg:"Access Denied"
                });
              }
          })
        }
        else{
            res.json({
                msg:"Access Denied"
            });
        }
    }else{
        res.json({
            msg:"Access Denied"
        });
    }

    
    
})

Router.get('/mostSold', (req, res)=>{
    knex('products').orderBy('profit_percentage', 'desc').limit(5).then((data)=>{
        res.json({
            msg: "success",
            data : data
        });
    })
})


module.exports = Router;