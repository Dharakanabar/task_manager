const validator=require('validator')



const ValidEmail=(email)=>{
    if(!validator.isEmail(email)){
        throw new Error("invalid email");
        
    }
    return email
}

const ValidPassword=(password)=>{
    if(!validator.isStrongPassword(password)){
        throw new Error("invalid password");
        
    }
    return password
}


module.exports={ValidEmail,ValidPassword}