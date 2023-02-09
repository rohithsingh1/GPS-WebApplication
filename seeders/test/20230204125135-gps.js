const {sequelize}=require('../../models');
const db=require('../../models')

// const BulkGpsData= async () => {
//     const gpsData=await db.Gp.bulkCreate(
//             [
//             {
//                 Id: 1,
//                 DeviceId: "D-1567",
//                 DeviceType: "Aircraft",
//                 Timestamp:"2022-08-31T04:40:00.000Z",
//                     Location: "L1",
//                   createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//             },
//             {
//                 Id: 2,
//                 DeviceId: "D-1567",
//                 DeviceType: "Aircraft",
//                 Timestamp:"2022-10-31T04:40:00.000Z",
//                 Location: "L1",
//                   createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//             },
//             {
//                 Id: 3,
//                 DeviceId: "D-1567",
//                 DeviceType: "Aircraft",
//                 Timestamp:"2022-06-04T04:40:00.000Z",
//                 Location: "L2",
//                   createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//             },
//             {
//                 Id: 4,
//                 DeviceId: "D-1568",
//                 DeviceType: "Personal",
//                 Timestamp:"2021-06-25T04:40:00.000Z",
//                 Location: "L1",
//                   createdAt: "2013-09-23",
//       updatedAt: "2013-09-23"
//             },
//             // {
//             //     Id: 5,
//             //     DeviceId: "D-1568",
//             //     DeviceType: "Personal",
//             //     Timestamp:"2021-06-05T04:40:00.000Z",
//             //     Location:"L1"
//             // },
//             // {
//             //     Id: 6,
//             //     DeviceId: "D-1568",
//             //     DeviceType: "Aircraft",
//             //     Timestamp:"2021-08-21T04:40:00.000Z",
//             //     Location:"L2"
//             // },
//             // {
//             //     Id: 7,
//             //     DeviceId: "D-1569",
//             //     DeviceType: "Aircraft",
//             //     Timestamp:"2020-12-14T04:40:00.000Z",
//             //     Location:"L1"
//             // },
//             // {
//             //     Id: 8,
//             //     DeviceId: "D-1569",
//             //     DeviceType: "Aircraft",
//             //     Timestamp:"2021-06-14T04:40:00.000Z",
//             //     Location:"L2"
//             // },
//             // {
//             //     Id: 9,
//             //     DeviceId: "D-1569",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-08-14T04:40:00.000Z',
//             //     Location:"L1"
//             // },
//             //  {
//             //     Id: 10,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-08-15T04:40:00.000Z',
//             //     Location:"L1"
//             // },
//             //  {
//             //     Id: 11,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-09-15T04:40:00.000Z',
//             //     Location:"L1"
//             // },
//             //  {
//             //     Id: 12,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-08-10T04:40:00.000Z',
//             //     Location:"L1"
//             // },
//             //   {
//             //     Id: 13,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-08-11T04:40:00.000Z',
//             //     Location:"L2"
//             // },
//             //    {
//             //     Id: 14,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2021-09-12T04:40:00.000Z',
//             //     Location:"L2"
//             // },
//             //     {
//             //     Id: 15,
//             //     DeviceId: "D-1570",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2022-08-10T04:40:00.000Z',
//             //     Location:"L3"
//             // },
//             //     {
//             //     Id: 16,
//             //     DeviceId: "D-1571",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2022-10-10T04:40:00.000Z',
//             //     Location:"L3"
//             // },
//             //      {
//             //     Id: 17,
//             //     DeviceId: "D-1572",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-03-21T22:00:00.000Z',
//             //     Location:"L1"
//             // },
//             //       {
//             //     Id: 18,
//             //     DeviceId: "D-1572",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-03-21T22:05:00.000Z',
//             //     Location:"L2"
//             // },
//             //        {
//             //     Id: 19,
//             //     DeviceId: "D-1572",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-03-21T22:10:00.000Z',
//             //     Location:"L3"
//             // },
//             //         {
//             //     Id: 20,
//             //     DeviceId: "D-1573",
//             //     DeviceType: "Aircraft",
//             //     Timestamp:'2018-05-10T13:00:00.000Z',
//             //     Location:"L3"
//             // },
//             //          {
//             //     Id: 21,
//             //     DeviceId: "D-1573",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-05-10T13:05:00.000Z',
//             //     Location:"L4"
//             // },
//             //           {
//             //     Id: 22,
//             //     DeviceId: "D-1573",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2018-05-10T13:10:00.000Z',
//             //     Location:"L5"
//             // },
//             //            {
//             //     Id: 23,
//             //     DeviceId: "D-1574",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-07-15T05:15:00.000Z',
//             //     Location:"L3"
//             // },
//             //             {
//             //     Id: 24,
//             //     DeviceId: "D-1574",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2017-07-15T05:20:00.000Z',
//             //     Location:"L1"
//             // },
//             //              {
//             //     Id: 25,
//             //     DeviceId: "D-1574",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-07-15T05:25:00.000Z',
//             //     Location:"L3"
//             // },
//             //               {
//             //     Id: 26,
//             //     DeviceId: "D-1575",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-04-19T20:25:00.000Z',
//             //     Location:"L8"
//             // },
//             //               {
//             //     Id: 27,
//             //     DeviceId: "D-1575",
//             //     DeviceType: "aircraft",
//             //     Timestamp:'2017-04-19T20:30:00.000Z',
//             //     Location:"L1"
//             // },
//             //               {
//             //     Id: 28,
//             //     DeviceId: "D-1575",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-04-19T20:35:00.000Z',
//             //     Location:"L8"
//             // },
//             //               {
//             //     Id: 29,
//             //     DeviceId: "D-1576",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-08-16T10:40:00.000Z',
//             //     Location:"L3"
//             // },
//             //               {
//             //     Id: 30,
//             //     DeviceId: "D-1576",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-08-16T10:45:00.000Z',
//             //     Location:"L3"
//             // },
//             //               {
//             //     Id: 31,
//             //     DeviceId: "D-1576",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2017-08-16T10:50:00.000Z',
//             //     Location:"L8"
//             // },
//             //               {
//             //     Id: 32,
//             //     DeviceId: "D-1577",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-06-05T01:55:00.000Z',
//             //     Location:"L3"
//             // },
//             //               {
//             //     Id: 33,
//             //     DeviceId: "D-1577",
//             //     DeviceType: "Personal",
//             //     Timestamp:'2018-06-05T02:00:00.000Z',
//             //     Location:"L8"
//             // },
//             //               {
//             //     Id: 34,
//             //     DeviceId: "D-1577",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-06-05T02:05:00.000Z',
//             //     Location:"L1"
//             // },
//             //               {
//             //     Id: 35,
//             //     DeviceId: "D-1578",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-09-20T17:10:00.000Z',
//             //     Location:"L8"
//             // },
//             //               {
//             //     Id: 36,
//             //     DeviceId: "D-1578",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-09-20T17:15:00.000Z',
//             //     Location:"L1"
//             // },
//             //               {
//             //     Id: 37,
//             //     DeviceId: "D-1578",
//             //     DeviceType: "Phone",
//             //     Timestamp:'2018-09-20T17:20:00.000Z',
//             //     Location:"L2"
//             // }, 
//         ]
//   )
//   console.log("gpsData = ",gpsData)
//     return gpsData
// }


// module.exports = BulkGpsData

'use strict';

// /** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    //console.log("queryInterface = ", queryInterface)
    //console.log(sequelize)
    return queryInterface.bulkInsert('Gps',
           [
            {
                //Id: 1,
                DeviceId: "D-1567",
                DeviceType: "Aircraft",
                Timestamp:"2013-09-23",
               Location: "L1",
                createdAt: "2013-09-23",
                updatedAt: "2013-09-23"
            },
            {
                //Id: 2,
                DeviceId: "D-1567",
                DeviceType: "Aircraft",
                Timestamp:"2013-09-23",
              Location: "L1",
                createdAt: "2013-09-23",
                updatedAt: "2013-09-23"
            },
            {
                //Id: 3,
                DeviceId: "D-1567",
                DeviceType: "Aircraft",
                Timestamp:"2013-09-23",
              Location: "L2",
                // createdAt: "2013-09-23",
                // updatedAt: "2013-09-23"
            },
            {
                //Id: 4,
                DeviceId: "D-1568",
                DeviceType: "Personal",
                Timestamp:"2013-09-23",
              Location: "L1",
                createdAt: "2013-09-23",
                updatedAt: "2013-09-23"
            } 
        ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gps', null, {});
  }
};
















