const router=require('express').Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const authMiddleware=require('../middleware/authMiddleware');
const db=require('../models')
const date=require('date-and-time')
const { QueryTypes, where,Sequelize } = require('sequelize');

router.post('/add-gps-data',authMiddleware, async (req, res) => {
    try {
        let {Timestamp,DeviceId,DeviceType,Location}=req.body
        const gpsData=await db.Gp.create({
            DeviceId,
                DeviceType,
                Location,
                Timestamp
        })
         let resultdata=await db.sequelize.query(
            `SELECT DeviceId,DeviceType,Timestamp as Time,Location FROM Gps where (Timestamp,createdAt) IN (select max(Timestamp) , max(createdAt) from Gps group by DeviceId) order by DeviceId`,
             {type: QueryTypes.SELECT});
        //console.log('resultdata = ', resultdata)
        res.send({
            message:"Data inserted successfully",
            data: resultdata,
            success:true
        }).status(200)
    } catch (error) {
        console.log('err :',error)
        res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})


router.post('/show-data',async (req, res) => {
    try {
        let resultdata=await db.sequelize.query(
            `SELECT DeviceId,DeviceType,Timestamp as Time,Location FROM Gps where (Timestamp,createdAt) IN (select max(Timestamp) , max(createdAt) from Gps group by DeviceId) order by DeviceId`,
            {type: QueryTypes.SELECT});
        res.send({
            message: "Successfully fetched data",
            success: true,
            data:resultdata
        }).status(200)
    } catch (error) {
        console.log('err :',error)
        res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})

router.post('/show-device-data',authMiddleware, async (req, res) => {
    try {
        const {DeviceId}=req.body
        let resultdata=await db.sequelize.query(
            `SELECT DeviceId,DeviceType, Timestamp ,Location FROM Gps where DeviceId='${DeviceId}'`,
            {type: QueryTypes.SELECT});
        res.send({
            message: "fetched device data successfully",
            success: true,
            data: resultdata,
            token : null
        }).status(200)
    } catch(error) {
        console.log(error)
        res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})

module.exports=router;















