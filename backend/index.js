const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require ('mysql2');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// database connection

const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passsword: '',
    database: 'crudfra',
    port:3306
});

// check database connection

db.connect(err=>{
    if (err) {console.log(err,"dberr");}
    console.log("database conected in port 3000"); 
});

//get all data

app.get('/usuarios',(req,res)=>{
    let qr = 'select * from usuarios';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"errs");
        }
        if(result.length>0){
            res.send({
                message:'Mostrando todos los usuarios',
                data:result
            });
        }
    });
});

app.listen(3000,()=>{
    console.log('Server listening in port 3000');
});