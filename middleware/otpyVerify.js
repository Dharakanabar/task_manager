const jwt = require('jsonwebtoken')

const otpVerify = (req, res, next) => {
    const {otpToken} = req.body

    if(!otpToken){
        throw new Error('token is required!')
    }

    try {
        const decode  = jwt.verify(otpToken, 'abcd')
        req.otp = decode
        console.log(decode);
        next()
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports = otpVerify