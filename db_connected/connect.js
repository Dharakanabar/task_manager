const mongoose=require('mongoose')

const URI = process.env.DBURL

const dbConnect = async()=>{
    try {
        await mongoose.connect(URI)
        console.log('dbConnect');
        
    } catch (error) {
        console.log(error.message);
        
    }
}
dbConnect()

module.exports=dbConnect