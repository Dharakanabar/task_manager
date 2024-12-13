const express=require('express')
const { TaskAdd, TaskRead, TaskUpdate, TaskDelete } = require('../controller/task_controller')
const auth = require('../middleware/auth')


const router= express.Router()

router.post('/task/add',auth ,TaskAdd)
router.get('/task/read',auth,TaskRead)
router.patch('/task/update/:id',TaskUpdate)
router.delete('/task/delete/:id',TaskDelete)

module.exports=router