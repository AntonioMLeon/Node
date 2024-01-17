const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const {connection} = require("../config.db.js");

const getEstudiante = (request, response) => {
    connection.query("SELECT * FROM estudiante",
    (error, results) => {
    if(error)
    throw error;
    response.status(200).json(results);
    });
    };
    
    app.route("/estudiante")
    .get(getEstudiante);

const postEstudiante = (request, response) => {
    const {nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email} = request.body;
    connection.query("INSERT INTO estudiante(nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email) VALUES (?,?,?,?)",
    [nombre, apellido, fecha_nacimiento, direccion, telefono, codigo_postal, email],
    (error, results) => {
    if(error)
    throw error;
    response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
    };
    
    app.route("/estudiante")
    .post(postEstudiante);

const delEstudiante = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from estudiante where id = ?",
    [id],
    (error, results) => {
    if(error)
    throw error;
    response.status(201).json({"Item eliminado":results.affectedRows});
    });
    };

    app.route("/estudiante/:id")
    .delete(delEstudiante);
    module.exports = app;