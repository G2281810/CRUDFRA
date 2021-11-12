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

//Petición GET mostrar usuarios //

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
        else
        {
            res.status(404).send({
                message: 'Usuarios no encontrado'
            });
        }
    });
});

//Petición GET un solo usuario //
app.get('/usuarios/:idusuario',(req,res)=>{
    let gID = req.params.idusuario;
    let qr = `select *from usuarios where idusuario = ${gID}`;
    
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'Mostrando un solo usuario',
                data:result
            });
        }
        else
        {
            res.status(404).send({
                message:'Usuario no encontrado'
            });
        }
    });
    
});

//Petición POST agregar un nuevo usuario//
app.post('/usuarios',(req,res)=>{
    console.log(req.body,'createdata');

    let nombreusu = req.body.nombreusu;
    let apellido1 = req.body.apellido1;
    let apellido2 = req.body.apellido2;
    let edad = req.body.edad;
    let telefono = req.body.telefono;
    let correo = req.body.correo;
    let pass = req.body.pass;

    let qr = `insert into usuarios(nombreusu,apellido1,apellido2,edad,telefono,correo,pass) 
                values('${nombreusu}','${apellido1}','${apellido2}','${edad}','${telefono}','${correo}', '${pass}')`;
    console.log(qr,'qr')
        db.query(qr,(err,result)=>{
            if(err){console.log(err);}
            console.log(result,'result')
            res.send({
                message:'Usuario registrado',
            });
        });
});

//Petición PUT actualizar un usuario
app.put('/usuarios/:idusuario',(req,res)=>{
    console.log(req.body,'updatedata');

    let gID = req.params.idusuario;
    let nombreusu = req.body.nombreusu;
    let apellido1 = req.body.apellido1;
    let apellido2 = req.body.apellido2;
    let edad = req.body.edad;
    let telefono = req.body.telefono;
    let correo = req.body.correo;
    let pass = req.body.pass;

    let qr = `update usuarios set nombreusu='${nombreusu}',apellido1='${apellido1}',apellido2='${apellido2}',edad='${edad}',telefono='${telefono}',
                correo='${correo}',pass='${pass}' where idusuario=${gID}`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'Usuario editado'
        });
    });

});

//Petición DELETE eliminar usuarios 
app.delete('/usuarios/:idusuario',(req,res)=>{
    let qID = req.params.idusuario;
    let qr = `delete from usuarios where idusuario='${qID}' `;
    db.query(qr,(err,result)=>{
        if(err){res.status(404).send("Error al elimianar usuario");}
        res.send({
            message: 'Usuario Eliminado'
        });
    });
});

app.listen(3000,()=>{
    console.log('Server listening in port 3000');
});