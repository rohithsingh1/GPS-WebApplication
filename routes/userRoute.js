const router=require('express').Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {User}=require('../models');
const authMiddleware=require('../middleware/authMiddleware');

router.post("/register", async (req, res) => {
    try {
        const hashedPassword=await bcrypt.hash(req.body.Password,10)
        req.body.Password=hashedPassword
        const {Name,Email, Password}=req.body;
        const user=await User.create({Name, Email, Password});
        //console.log("user = ",user)
        res.send({
            message: 'User created successfully',
            success: true,
            data: user,
            token : null
        }).status(200)
    } catch(err) {
    res.send({
            message: err.errors[0].message,
            success: false,
            data: null,
            token : null
        })
  }
});

router.post("/login", async (req, res) => {
    try {
        const {Email}=req.body;
        const ExistingUser = await User.findOne({ where: { Email: Email } });
        if (ExistingUser === null) {
            return res.send({
                message: 'User does not exist',
                success: false,
                data: null,
                token : null
            })
        } else {
            const passwordMatch=await bcrypt.compare(req.body.Password, ExistingUser.Password)
            if(!passwordMatch) {
                res.send({
                    message: "Incorrect email or password",
                    success: false,
                    data: null,
                    token : null
                })
            } else {
                const jwtToken=jwt.sign({
                    Name: ExistingUser.Name,
                    Email: ExistingUser.Email,
                    UserId: ExistingUser.id,
                    id:ExistingUser.id
                    },process.env.JWT_KEY,{
                        expiresIn : '1d'
                })
                const {Email, UserId,id, Name}=ExistingUser
                return res.send({
                    message: "User logged in Successfully",
                    success: true,
                    data: {Email,UserId,id,Name},
                    token : jwtToken
                }).status(200)
            }
        }
    } catch(error) {
        console.log('error')
        return res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})

router.post('/get-user-data', authMiddleware, async (req, res) => {
    //console.log('req.body in get-user-data = ',req.body)
    try {
        const user=await User.findOne({
            where: {
                Email: req.body.Email,
                id: req.body.UserId
            }
        });
        if(!user){
            return res.send({
                message: 'user not found',
                success: false,
                data: null,
                token : null,
            })
        }
        const {UserId,id, Name, Email}=user;
        return res.send({
                message: 'user data fetched successfully',
                success: true,
                data: {UserId,id, Name, Email},
                token : null
            }).status(200)
    } catch (error) {
        return res.send({
            message: error.message,
            success: false,
            data: null,
            token: null
        })
    }
})


module.exports=router;

