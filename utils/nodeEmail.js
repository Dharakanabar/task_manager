const nodemailer= require('nodemailer')
require('dotenv').config()





const Transport =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODE_EMAIL,
        pass:process.env.NODE_PASS
    }
})

const sendingEmail=async(email,subject,message)=>{
    mailOptions={
        from:process.env.NODE_EMAIL,
        to:email,
        subject:subject,
        text:message
    }
    await Transport.sendMail(mailOptions)
}


module.exports=sendingEmail