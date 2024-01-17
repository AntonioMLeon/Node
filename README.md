# API NODE

Este repositorio contiene una sencilla API en Node.js que utiliza Express como framework principal y se conecta a una base de datos MySQL. Además, se ha incorporado la capacidad de gestionar variables de entorno mediante archivos `.env` para una configuración flexible.

## Instalación

Para comenzar a trabajar con la API, sigue estos pasos:

### 1. Instalación de Node.js y Express

Asegúrate de tener Node.js instalado en tu sistema. Luego, ejecuta el siguiente comando para instalar Express:

```bash
npm install express --save
```

### 2. Instalamos la extensión de conexión con mysql:


```bash
npm i mysql2
```

### 3. Comando para la instalación de la extensión para la lectura de ficheros .env (ficheros de configuración de variables):


```bash
npm i nodemon dotenv --save-dev
```

###4. Organización de carpetas:

-node_modules
-routes(estudiante.js, profesor.js)
-.env
-app.js
-config.db.js
-docker-compose.yml
-package-lock.json
-package.json

###5. Hacemos un docker-compose up -d para iniciar el contenedor:

```bash
docker compose up -d
```
###6. Hacemos la conexión a la base de datos dado nuesto .env

###7. app.js:


```bash
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
```

###8. estudiante.js:

```bash
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
```

###9. config.db.js:

```bash
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql2');
let connection;
try {
connection = mysql.createConnection({
host: process.env.DBHOST,
user: process.env.DBUSER,
password: process.env.DBPASS_ROOT,
database: process.env.DB_NAME,
port: process.env.DBPORT
});
} catch (error) {
console.log("Error al conectar con la base de datos");
}
module.exports = {connection};
```
###10. Una vez realizado todo lo anterior podemos hacer una llamada GET a nuestra base de datos

