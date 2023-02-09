const jwt=require('jsonwebtoken')
module.exports=(req, res, next) => {
    try {
        const jwtToken=req.headers.authorization.split(" ")[1];
        if(!jwtToken) {
            return res.send({
                message: 'Token not found or expired',
                success: false,
                data : null,
            })
        }
        //console.log('jwtToken = ',jwtToken)
        const decoded=jwt.verify(jwtToken, process.env.JWT_KEY)
        req.body.UserId=decoded.UserId;
        req.body.Email=decoded.Email;
        req.body.id=decoded.id;
        req.body.jwtToken=jwtToken
        //console.log('req.body in authmiddleware = ',req.body)
        next()
    } catch(error) {
        console.log('error = ',error)
        return res.status(200).send({
                message: 'Authorization Failed',
                success: false,
                data: null,
                token : null
            })
    }
}








