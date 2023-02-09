const mysql=require('mysql')
const mysqlConn=mysql.createConnection({
    //Host: Specifies the host that runs the database
    host: "localhost",// default localhost
    //User: Sets the user’s name
    user: "root",// default root
    //Password: Sets up a password
    password: "rohithsingh",
    //Database: Names the database
})

module.exports = mysqlConn








