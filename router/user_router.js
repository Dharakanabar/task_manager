const express=require('express')
const { UserAdd, UserRead, UserUpdate, Login, logout, verificationOtp } = require('../controller/user_controller')
const auth = require('../middleware/auth')
const { upload } = require('../middleware/multer')
const multer = require('multer')
const otpVerify = require('../middleware/otpyVerify')
//.const auth = require('../middleware/auth')


const UserRouter=express.Router()
UserRouter.post('/user/add',upload.single('profile'),UserAdd)
UserRouter.get('/user/read',auth, UserRead)
UserRouter.patch('/user/update',auth,UserUpdate)
UserRouter.post('/user/login',Login)
UserRouter.post('/user/logout',logout)
// userrouter.post('/add',upload.single('profile'),adduserdata)
UserRouter.post('/add',upload.single('profile'),UserAdd)
UserRouter.post('/user/otp',otpVerify, verificationOtp)



module.exports=UserRouter