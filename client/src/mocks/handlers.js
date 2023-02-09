import { rest } from 'msw'

export const handlers=[
  rest.post('/api/users/login', (req, res, ctx) => {
    console.log('login api called!!!!!');
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message:"User login successfully",
        data: {
          "Id": 1,
          "Email": "rohith@gmail.com",
          "Password":"Rohith@46"
        }
      })
    )
  }),
  rest.post('/api/users/register', (req, res, ctx) => {
    console.log('register api called!!!!!');
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message:"User created successfully",
        data: {
          "Id": 1,
          "Name": "rohith",
          "Email": "rohith@gmail.com",
          "Password":"Rohith@46"
        }
      })
    )
  }),
  rest.post('/api/gps/show-data', (req, res, ctx) => {
      console.log('show-data api called');
    return res(
      ctx.status(200),
        ctx.json({
          "success": true,
          "message":"Successfully fetched data",
    "data": [
      {
        "Id":1,
        "DeviceId": "D-1567",
        "DeciceType": "Phone",
        "Time": "2022-08-31T04:40:00.000Z",
        "Location":"L2"
      },
      {
        "Id":2,
        "DeviceId": "D-1567",
        "DeciceType": "Phone",
        "Time": "2022-06-20T04:40:00.000Z",
        "Location":"L2"
      },
    ]
      })
    )
  }),
  rest.post('/api/gps/show-device-data', (req, res, ctx) => {
      console.log('show-device-data api called');
    return res(
      ctx.status(200),
        ctx.json({
         "message": "fetched device data successfully",
	"success": true,
	"data": [
		{
			"DeviceId": "D-1567",
			"DeviceType": "Aircraft",
			"Timestamp": "2022-08-31T04:40:00.000Z",
			"Location": "L1"
		},
		{
			"DeviceId": "D-1567",
			"DeviceType": "Aircraft",
			"Timestamp": "2022-10-31T04:40:00.000Z",
			"Location": "L1"
		},
		{
			"DeviceId": "D-1567",
			"DeviceType": "Aircraft",
			"Timestamp": "2022-06-04T04:40:00.000Z",
			"Location": "L2"
		}
	]
      })
    )
  })
]
