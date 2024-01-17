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