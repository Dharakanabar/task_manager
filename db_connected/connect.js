const mongoose=require('mongoose')

const dbConnect = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/task_manege_1')
        console.log('dbConnect');
        
    } catch (error) {
        console.log(error.message);
        
    }
}
dbConnect()

module.exports=dbConnect