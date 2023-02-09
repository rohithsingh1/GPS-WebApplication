const db=require('../../models')

// const BulkUserData=async () => {
//     const userData=await db.User.bulkCreate([
//          {
//         Name: "Rohith",
//         Email: "rohithsingh@gmail.com",
//         Password: "Rohith@123456",
//         UserId:1,
//       createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//     },
//       {
//       UserId:2,
//       Name: "Karthik",
//         Email: "karthiksingh@gmail.com",
//         Password:"Karthik@123456",
//       createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//     },
//       {
//       UserId:3,
//       Name: "Geetha",
//         Email: "geethasingh@gmail.com",
//         Password:"Geetha@123456",
//       createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//     }
//     ])
//   console.log('userdata = ',userData)
//     return userData
// }

// module.exports = BulkUserData












'use strict';

// /** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    //console.log("Sequelize = ", Sequelize)
    return queryInterface.bulkInsert('Users', [
      {
        Name: "Rohith",
        Email: "rohithsingh@gmail.com",
        Password: "Rohith@123456",
        UserId:1,
      createdAt: "2013-09-23",
      updatedAt: "2013-09-23"
    },
      {
      UserId:2,
      Name: "Karthik",
        Email: "karthiksingh@gmail.com",
        Password:"Karthik@123456",
      createdAt: "2013-09-23",
      updatedAt: "2013-09-23"
    },
      {
      UserId:3,
      Name: "Geetha",
        Email: "geethasingh@gmail.com",
        Password:"Geetha@123456",
      createdAt: "2013-09-23",
      updatedAt: "2013-09-23"
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};










