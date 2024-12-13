const mongoose=require('mongoose')
const Task = require('../model/task_model')
const { query } = require('express')


const TaskAdd= async(req,res)=>{
    try {
        const {title,description}=req.body
        const user_id= req.user._id
        //console.log(user_id);
        
        if(!title || !description ){
throw new Error("All fields (title, description) are required.");

        }
        const task= new Task({title,description,user_id})
        await task.save()
        res.status(200).json({message:'task data is add',data:task})
    } catch (error) {
        res.status(400).json({e:error.message})
    }
}



const TaskRead=async(req,res)=>{
    try {
        //const task= await Task.find()
        const user_id= req.user._id
        
        
        const {title,page,limit}=req.query
       const query={user_id}
       if(title){
        query.title={
        $regex:title,
        $options:'1'
       }}
        const PageNumber= parseInt(page)||1
        const LimitNumber= parseInt(limit)||2
        const skip=(PageNumber-1)*LimitNumber
const task= await Task.find(query).skip(skip).limit(LimitNumber).populate('user_id')
        res.status(200).json({message:'task data read',data:task})
    } catch (error) {
        res.status(400).json({e:error.message})
    }

}

const TaskUpdate=async(req,res)=>{
    try {
        const {id}=req.params
        const {title}=req.body
        const task = await Task.findByIdAndUpdate(id,{
            set:{title} },
        {new:true})
        res.status(200).json({message:'task data update',data:task})
    } catch (error) {
        res.status(400).json({e:error.message})
    }
}
const TaskDelete=async (req,res)=>{
    try {
        const {id}=req.params
        const task= await Task.findByIdAndDelete(id)
        res.status(200).json({message:'task data is deleted'})
    } catch (error) {
        res.status(400).json({e:error.message})
    }
}
module.exports={TaskAdd,TaskRead,TaskUpdate,TaskDelete}