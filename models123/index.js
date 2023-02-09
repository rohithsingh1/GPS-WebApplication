const {Sequelize}=require("sequelize");
const path = require('path');
const db = {};
const sequelize = new Sequelize(
   "testNodejsmysql001",//database name
   'root',//username default root
   'rohithsingh',//password
    {
        host: 'localhost',//default localhost
        port : 3306,
        dialect: 'mysql',
        logging: false
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

let arr=['user','gps'];
arr.forEach((file) => {
   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
})
Object.keys(db).forEach(modelName => {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db




