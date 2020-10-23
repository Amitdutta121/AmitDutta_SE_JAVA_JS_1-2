const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }else{
        console.log("Connection Failed");
    }
});

module.exports = mysqlConnection;
// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('ecommerce', 'root', {host:127.0.0.1, dialect:"mysql", operatorAliases: false})

// module.exports = sequelize;
// global.sequelize = sequelize;