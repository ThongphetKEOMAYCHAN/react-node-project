var mysql = require("mysql")
var connection = mysql.createPool({
    connectionLimit: 100000,
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database:"react_node_db"
})

module.exports = connection;