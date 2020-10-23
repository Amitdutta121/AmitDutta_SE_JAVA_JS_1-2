const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../connection');
const {productValidation, isRequestedValidated} = require('../validator/productValidaton');

Router.get('/', (req, res)=>{
    mysqlConnection.query("SELECT * from products", (err, rows, fields)=>{
        if(!err){
            res.json({
                msg: "success",
                data : rows
            });
        }else{
            res.json({
                msg: "Database Error"
            });
        }
    })
})

Router.get('/singleProduct/:id', (req, res)=>{
    mysqlConnection.query("SELECT * from products WHERE id= ?",[req.params.id], (err, rows, fields)=>{
        if(!err){
            res.json({
                msg: "success",
                data : rows
            });
        }else{
            res.json({
                msg: "Database Error"
            });
        }
    })
})

Router.delete('/:id', (req, res)=>{
    mysqlConnection.query("DELETE from products WHERE id= ?",[req.params.id], (err, rows, fields)=>{
        if(!err){
            res.json({
                msg: "success",
                data : "Successfully Deleted"
            });
        }else{
            res.json({
                msg: "Database Error"
            });
        }
    })
})

Router.post('/addProduct',productValidation,isRequestedValidated,(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      else{
        mysqlConnection.query(`INSERT INTO products VALUES ('','${req.body.name}', '${req.body.price}','${req.body.profit}','${req.body.category}')`, (err, rows, fields)=>{
            if(!err){
                res.json({
                    msg: "Successfully Added",
                    data : req.body
                });
            }else{
                res.json({
                    msg: "Database Error"
                });
            }
        })
}
    
})

Router.post('/editProduct/:id', (req, res)=>{

    mysqlConnection.query("SELECT * from products WHERE id= ?",[req.params.id], (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                let sql = "UPDATE products SET "

                if(req.body.name){
                    sql = sql + ` product_name='${req.body.name}'`;
                }
                if(req.body.price){
                    sql = sql + ` product_price='${req.body.price}'`;
                }
                if(req.body.profit){
                    sql = sql + ` price_profit='${req.body.profit}'`;
                }
                if(req.body.category){
                    sql = sql + ` product_category='${req.body.category}'`;
                }
                sql = sql + ` WHERE id='${req.params.id}'`;

                

                
                mysqlConnection.query(sql, (err, rows, fields)=>{
                    if(!err){
                        res.json({
                            msg: "success",
                            data : "Successfully Updated"
                        });
                    }else{
                        res.json({
                            msg: "Database Error"
                        });
                    }
                })

            }else{
                res.json({
                    msg: "error",
                    data : "No such product found"
                });
            }
        }else{
            res.json({
                msg: "Database Error"
            });
        }
    })
    
    
    
})

Router.get('/mostSold', (req, res)=>{
    mysqlConnection.query("SELECT * from products ORDER BY profit_percentage DESC ", (err, rows, fields)=>{
        if(!err){
            res.json({
                msg: "success",
                data : rows
            });
        }else{
            res.json({
                msg: "Database Error"
            });
        }
    })
})


module.exports = Router;