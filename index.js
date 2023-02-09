require('dotenv').config()
const connection=require('./config/connect-and-createDb')
const createDb=connection.connectDB
createDb()
const express=require('express')
const app=express()

const db=require('./models/index')
const userRoute=require('./routes/userRoute')
const gpsRoute=require('./routes/gpsRoute')
const Data = require("./data/GPSData")
const cors=require('cors')

app.use(express.json())
app.use(cors({
  origin:'*'
}))

app.use('/api/users', userRoute)
app.use('/api/gps',gpsRoute)

const port=5000;
db.sequelize.sync({force : true})
  .then((result) => {
    console.log('*****result*******')
    app.listen(port, () => {
      console.log(`node server listening at port no ${port}`);
      Data.BulkGpsData()
      Data.BulkUserData()
    })
  })
  .catch((err) => {
    console.log(err);
  })

// app.listen(port, () => {
//   console.log(`node server listening at port no ${port}`);
//   db.sequelize.sync({force: true}).then((result) => {
//       console.log("result")
//     }).catch((err)=>{
//       console.log("err = ",err)
//     })
//       //Data.BulkGpsData()
//       //Data.BulkUserData()
// })


module.exports = app















