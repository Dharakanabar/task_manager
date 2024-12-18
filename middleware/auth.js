const jsonwebtoken=require('jsonwebtoken')
const User = require('../model/user_model')

const auth=async (req,res,next)=>{
    try {
        const authHeader=req.headers['authorization']

        if(!authHeader || !authHeader.startWith('Bearer ')){
            throw new Error('Please provide token or invalid token!')
        }

        const token = authHeader.replace('Bearer ', "")

        const decode=jsonwebtoken.verify(token,'abcd')
        const user=await User.findOne({_id:decode.id})
        if(!user){
            throw new Error("invalid token");
            
        }
        req.user=user
        next()
    } catch (error) {
        res.status(400).json({e:error.message})
    }
}

module.exports=auth

















// const adduserdata=async(req,res,next)=>{
//     try {
//         const {name,email,password}=req.body
//         const file=req.file
//         const isEmail=await User.findOne({email})
//         if(isEmail){
//             throw new Error('you are already add ,please login')
//         }

//         isvalidemail(email)
//         isvalideposword(password)

//         const encodedPassword= await encryptPass(password)
//         const user= new User({
//             name,
//             email,
//             password:encodedPassword
//         })

//         if(file){
//             let profile = file.filename
//             user.profile=`${req.protocol}://${req.get('host')}/${profile}`
//         }

//         await user.save()
//         res.status(200).json({message:'user data is added',data:user})
//     } catch (err) {
//     next(err)
//     }
// }


// const login= async (req,res)=>{
//     try {
//         const {email,password}=req.body
//         const user= await User.findOne({email})
//         if(!user){
//             throw new Error('invalid email!')
//         }

//         const validepossword =await velificatonpassword(password, user.password)
//         if(!validepossword){
//             throw new Error('invalid password')
//         }
//         const tokens=genratetoken(user._id)
//         user.tokens=user.tokens.concat({tokens})
//            await user.save()
// res.status(200).json({message:'user login successfully' ,
//     data:user,
//     tokens
// })
//     } catch (error) {
//         res.status(400).json({

//             e:error.message
//         })
//     }
// }
// const getuserdata=async(req,res)=>{
//     try {
//         const user=req.user
//         if(!user){
//             throw new Error('invalid data')
//         }

        
//         res.status(200).json({message:'data is get',data:user})
//     } catch (error) {
//         res.status(400).json({
//             message:error.message
//         })
//     }
// }



// const userdelete= async (req,res)=>{
//     try {
//         const User_id= req.user._id
//         const user=await User.findByIdAndDelete({_id:User_id})
//         const usertask=await Task.deleteMany({User_id})
//         res.status(200).json({message:'user task delete successfully',data:{user,usertask}})
        
//     } catch (error) {
//         res.status(400).json({e:error.message})
//     }
// }

// const tranport=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.NODE_EMAIL,
//         pass:process.env.NODE_PASS
//     }
// })

// const sendingEmail=async(email)=>{
//     mailOptions={
//         from:process.env.NODE_EMAIL,
//         to:email,
//         subject:'test email sending',
//         text:'your oder is conform, thanks for soaping '
//     }
//     await tranport.sendMail(mailOptions)
// }

// const emailsend= async(req,res)=>{
//     try {
//         const email='rayjadadivyarajsinh34@gmail.com'
//         await sendingEmail(email)

//     } catch (error) {
//         console.log(error.message);
        
//     }
// }
// emailsend()

// module.exports={adduserdata,login,getuserdata,userdelete}
// const adduserdata=async(req,res)=>{
// try {
//     const {name,email,password}=req.body

//     const encodedPassword=await encryptPass(password)


// const user = new User({
//     name,
//     email,
//     password:encodedPassword})

//   isvalidemail(email)


//   isvalideposword(password)


//   await  user.save()
//   const userData = user.toObject()

//        // delete userData.password
//   res.status(200).json({message:'task is add'})
// }

//  catch (error) {
//     res.status(400).json({e:error.message})
// }}

// const getuserdata =async(req,res)=>{
// try {
//     const user=await User.find()
//     res.status(200).json({data:user})
// } catch (error) {
//     res.status(400).json({e:error.message})
// }
// }

// const updateuserdata = async(req,res)=>{
//     try {
//         const {id}=req.param
//         const {name}=req.body
//         const user= await User.findByIdAndUpdate(id ,{
//             $set:{name}
//         },{new:true})
//         res.status(200).json({message:'user deta is update'})

//     } catch (error) {
//         res.status(400).json({e:error.message})
//     }
// }
// const deleteuserdata=async(req,rep)=>{
//     try {
//         const {id}=req.body
//         const user=await User.findByIdAndDelete(id)
//         res.status(200).json({message:'user deta is delete'})
//     } catch (error) {
//         res.status(400).json({e:error.message})
//     }
// }
// module.exports={adduserdata,getuserdata,updateuserdata,deleteuserdata}