const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const {connection} = require("../../config.db.js");

const getProfesor = (request, response) => {
    connection.query("SELECT * FROM profesor",
    (error, results) => {
    if(error)
    throw error;
    response.status(200).json(results);
    });
    };
    
    app.route("/profesor")
    .get(getProfesor);

    module.exports = app


const postProfesor = (request, response) => {
    const {nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad} = request.body;
    connection.query("INSERT INTO estudiante(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad) VALUES (?,?,?,?)",
    [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email, especialidad],
    (error, results) => {
    if(error)
    throw error;
    response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
    };
    
    app.route("/profesor")
    .post(postProfesor);

const delProfesor = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from profesor where id = ?",
    [id],
    (error, results) => {
    if(error)
    throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });
    };

    app.route("/profesor/:id")
    .delete(delProfesor);
    module.exports = app;