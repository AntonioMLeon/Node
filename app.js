var express = require("express");
var app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/estudiante'));
app.listen(process.env.DBPORT||3300,() => {
console.log("Servidor corriendo en el puerto 3300");
});

