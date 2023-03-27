const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task_id: String,
    id_Creator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    id_Receiver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    description: String,
    finish: Boolean,
    finish_time: Number,
    task_tittle: String,
    task_comment: String,
    deadline: Date,
    device_creator: String,
    device_receiver: String
},{
    collection: 'Task'
})

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;