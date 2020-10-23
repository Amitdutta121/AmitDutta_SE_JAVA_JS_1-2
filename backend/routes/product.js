const express = require('express');
const Router = express.Router();
const knex = require('knex')(require('../knexfile'))
const validator = require('validator');



// GET all records method:GET, return: JSON array
Router.get('/', (req, res)=>{
    knex.select().from('products').then((data)=>{
        res.json({
            msg:"success",
            data:data
        });
    })
})


// GET single product url:/singleProduct/:id method:GET, return: JSON array
Router.get('/singleProduct/:id', (req, res)=>{

    knex('products').where('id', req.params.id).then((data)=>{
        res.json({
            msg:"success",
            data: data
        })
    })
})

// GET single product url:/:id method:DELETE, return: JSON array
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


//Add single product url:/addProduct method:POST, return: JSON array data {name: name, price:price, profit:profit, category:category, config:{username: username, password: password}}
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
//Edit single product url:/editProduct/:id method:POST, return: JSON array data {name: name, price:price, profit:profit, category:category, config:{username: username, password: password}}

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
// GET modt dsole product (sort by profit_percentage DESC) url:/mostSold method:DELETE, return: JSON array
Router.get('/mostSold', (req, res)=>{
    knex('products').orderBy('profit_percentage', 'desc').limit(5).then((data)=>{
        res.json({
            msg: "success",
            data : data
        });
    })
})


module.exports = Router;