const multer=require('multer')
const storage=multer.diskStorage({
    destination:'upload',
    filename:function(req,file,cd){
        cd(null,file.originalname)
    }
    
    
})


exports.upload=multer({
    storage,
    limits:{fileSize :1*1024 *1024},
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
            return cb(new Error('pls upload an img jpg ,jpeg,png'))
        }
        cb(undefined, true)
    }
})