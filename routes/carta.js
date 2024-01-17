const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const {connection} = require("../../config.db");

const getCarta = (request, response) => {
    connection.query("SELECT * FROM carta",
    (error, results) => {
    if(error)
    throw error;
    response.status(200).json(results);
    });
    };
    
  
    app.route("/carta")
    .get(getCarta);

    module.exports = app;