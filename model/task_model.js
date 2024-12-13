const mongoose = require('mongoose')

const TaskChema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        require: true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Task = mongoose.model('task', TaskChema)

module.exports = Task