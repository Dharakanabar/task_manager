const generateOtp=()=>{
    return Math.floor(1000000+Math.random()*9000000).toString()
}

 generateOtp()
//console.log(otp);
 module.exports=generateOtp