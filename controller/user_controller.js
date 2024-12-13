const mongoose = require('mongoose');
const User = require('../model/user_model');
const { isEmail } = require('validator');
const { ValidEmail, ValidPassword } = require('../utils/validation');
const { VerificationPassword, EncryptPassword, } = require('../utils/bcrypt');
const GenerateToken = require('../utils/token');
const fs = require('fs')
const nodemailer = require('nodemailer');
const { log } = require('console');
const EmailSend = require('../utils/nodeEmail');
const sendingEmail = require('../utils/nodeEmail');
const generateOtp = require('../utils/otp');
const generateToken = require('../utils/token');
require('dotenv').config()

const UserAdd = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new Error("All fields (name,email,password) are required.");
        }
        const file = req.file
        console.log(req.body);

        //if(isEmail){
        // throw new Error("you are already register,please login");

        // }
        ValidEmail(email)
        ValidPassword(password)
        const encryptPassword = await EncryptPassword(password)
        const user = new User({
            name,
            email,
            password: encryptPassword
        })
        if (file) {
            let profile = file.filename
            user.profile = `${req.protocol}://${req.get('host')}/${profile}`
        }
        await user.save()
        res.status(200).json({ message: 'user task is add', data: user })
    } catch (error) {
        res.status(400).json({ e: error.message })

    }
}

const Login = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("invalid email");


        }

        const otp = generateOtp()

        const otpToken = generateToken({otp, id: user._id}, '5m')
        // console.log(otpToken);
        
        // await sendingEmail(user.email, `your login otp', 'your login otp is ${otp}. Please do not share!`)
        console.log(otp);
        res.status(200).json({ message: 'otp sent to your email!', token: otpToken })

    } catch (error) {
        res.status(400).json({ e: error.message })
    }

}


const verificationOtp = async (req, res) => {
    try {
        const { otp, otpToken } = req.body
        const reqOtp = req.otp

        if(!otp || !otpToken){
            throw new Error('please fill in all field')
        }

        if(otp !== reqOtp.otp){
            throw new Error('Invalid otp!')
        }

        const token = generateToken({id: reqOtp.id})

        // const token = await GenerateToken(user._id)
        // user.token = user.token.concat({ token })

        // await user.save();

        res.status(200).json({ message: "OTP verified successfully", token })

    } catch (error) {
        res.status(400).json({ e: error.message })
    }
}
const UserRead = async (req, res) => {
    try {
        // const user = await User.find()
        const user = req.user
        res.status(200).json({ message: 'user is read', data: user })
    } catch (error) {
        res.status(400).json({ e: error.message })
    }
}

const UserUpdate = async (req, res) => {
    try {
        const userId = req.user._id
        const { name } = req.body
        const user = await User.findByIdAndUpdate(userId, {
            $set: { name }
        },
            { new: true })
        res.status(200).json({ message: "user data is update", data: user })

    } catch (error) {
        res.status(400).json({ e: error.message })
    }
}



const logout = async (req, res) => {
    try {
        const { token } = req.body
        const user = await User.findOne({ 'token.token': token })
        if (!user) {
            throw new Error("user are not found");

        }
        user.token = user.token.filter((t) => t.token !== token)
        await user.save()
        res.status(200).json({ message: 'user are logout' })
    } catch (error) {
        res.status(400).json({ e: error.message })
    }
}



module.exports = { UserAdd, UserRead, UserUpdate, Login, verificationOtp, logout }