const bcrypt=require('bcryptjs')


const EncryptPassword= async (password)=>{
    const pass=await bcrypt.hash(password,8)
    return pass
}


const VerificationPassword= async(pass,password)=>{
    try {
        const VerifyPass= await bcrypt.compare(pass,password)
        return VerifyPass
    } catch (error) {
        console.log(error);
        throw error
        
    }
}



module.exports={EncryptPassword,VerificationPassword}