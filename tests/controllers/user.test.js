const request = require('supertest')
let app=require('../../index')
const chai=require('chai');
const {it}=require('mocha');
const delay = require("delay")
const {expect}=chai;


const newUser={
    Name: "rohith123",
    Email: "rohith@gmail.com",
}

describe('User and GPS API', () => {
  it("get registered user data", async function() {
    await delay(1200)
    this.timeout=18000
     const {body, status}=await request(app).post('/api/users/register').send({
          "Name":"rohith123",
	        "Email":"rohith@gmail.com",
	        "Password":"Rohith@123"
     })
    const {data} = body
    expect(status).to.equal(200)
    expect(data).to.be.an('object');
    expect(data).to.deep.include(newUser)
  })

  it('get login user data', async function() {
    await delay(1200)
    this.timeout=12000
    const {body, status}=await request(app).post("/api/users/login").send({
      "Email": "rohith@gmail.com",
      "Password":"Rohith@123"
    })
    const {data} = body
    expect(status).to.equal(200)
    expect(data).to.be.an('object');
    expect(data).to.have.own.property('Email')
  })


  it('get unique user data', async function() {
    await delay(1200)
    this.timeout=12000
    const {body, status}=await request(app).post("/api/users/login").send({
      "Email": "rohith@gmail.com",
      "Password":"Rohith@123"
    })
    const {token}=body
    const response =await request(app).post("/api/users/get-user-data").set('Authorization','Bearer '+ token).send({
      "Email": "rohith@gmail.com",
      "UserId":2
    })
    expect(response.status).to.equal(200)
    expect(response.body.data).to.be.an('object');
    expect(response.body.data).to.have.own.property('Email')
    expect(response.body.data).to.have.own.property('Name')
  })

  let newGPSData = {
      DeviceId: 'D-1567',
      DeviceType: 'Phone',
      Time: '2023-02-05T19:14:00.000Z',
      Location: 'L2'
    }
  it('testing add-gps-data API', async function() {
     await delay(1200)
        this.timeout=12000
        const {body, status}=await request(app).post("/api/users/login").send({
            "Email": "rohith@gmail.com",
            "Password":"Rohith@123"
        })
        const {token}=body
        const response =await request(app).post("/api/gps/add-gps-data").set('Authorization','Bearer '+ token).send({
            "DeviceId": "D-1567",
            "DeviceType": "Phone",
            "Location": "L2",
            "Timestamp":"2023-02-05T19:14:00.000Z"
        })
    let elefound =  response.body.data.filter((ele) => {
      return (ele.DeviceId === newGPSData.DeviceId && ele.Time === newGPSData.Time)
    })
    expect(response.status).to.equal(200)
    expect(response.body.data).to.be.an('array');
    expect(response.body.data).to.have.lengthOf(12);
    expect(elefound[0]).to.have.own.property('DeviceId')
  })

  it('testing show-data API', async function() {
     await delay(1200)
        this.timeout=12000
        const {body, status}=await request(app).post("/api/users/login").send({
            "Email": "rohith@gmail.com",
            "Password":"Rohith@123"
        })
        const {token}=body
        const response =await request(app).post("/api/gps/show-data").set('Authorization','Bearer '+ token).send({})
    expect(response.status).to.equal(200)
    expect(response.body.data).to.be.an('array');
    expect(response.body.data).to.have.lengthOf(12);
  })
  it('testing show-device-data API', async function() {
     await delay(1200)
        this.timeout=12000
        const {body, status}=await request(app).post("/api/users/login").send({
            "Email": "rohith@gmail.com",
            "Password":"Rohith@123"
        })
        const {token}=body
    const response=await request(app).post("/api/gps/show-device-data").set('Authorization', 'Bearer '+token).send({
          "DeviceId":"D-1567"
    })
    expect(response.status).to.equal(200)
    expect(response.body.data).to.be.an('array');
    expect(response.body.data).to.have.lengthOf(4);
  })
})












