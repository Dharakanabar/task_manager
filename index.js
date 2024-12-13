
const express=require('express')
const mongoose=require('mongoose')
const router = require('./router/task_router')
const UserRouter = require('./router/user_router')
const port=3000
const path=require('path')

const api=express()
api.use(express.json())
require('./db_connected/connect')
api.use(express.static(path.join(__dirname, 'upload')))
api.use(router)
api.use(UserRouter)
api.get('/read',(req,res)=>{
    res.send('hello ')
})
 api.listen(port,()=>{
    console.log(`server is running http://127.0.0.1:${port}`);
    
 })