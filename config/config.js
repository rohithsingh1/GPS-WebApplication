require('dotenv').config();
module.exports = {
  development: {
    username: "root",
    password: "rohithsingh",
    database: "testNodejsmysql001",
    host: "localhost",
    dialect: 'mysql',
  },
  test: {
    username: "root",
    password: "rohithsingh",
    database: "testNodejsmysql001",
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: "root",
    password: "rohithsingh",
    database: "testNodejsmysql001",
    host: "localhost",
    dialect: 'mysql',
  },
};