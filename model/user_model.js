const mongoose=require('mongoose')
const UserSchema= new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    token:[{
        token:{
            type:String
        }
    }],profile:{
        type:String
    }
        
    
})


const User= mongoose.model('user',UserSchema)


module.exports=User