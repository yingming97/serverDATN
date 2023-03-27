const response = require("../helper/response")
const TaskModel = require("../models/task.model")
const Users = require("../models/user.model");

class TaskController {
    async create(req, res) {
        try {
            const taskModel = new TaskModel(req.body);
            const saveTask = await taskModel.save();
            // if(req.body.id_Creator){
            //     const user = await TaskModel.findById(req.body.id_Creator);
            //     await user.updateOne({$push: {id_Creator: saveTask._id}});
            // }
            if (req.body.id_Receiver) {
                const user = await Users.findById(req.body.id_Receiver);
                await user.updateOne({$push: {user_id: saveTask._id}});
            }
            return response.successResponseWithData(res, "Insert task success", saveTask);
        } catch (err) {
            response.errorResponse(res, "Create task failed: " + err);
        }
    }

    async delete(req, res) {
        try {
            await Users.updateMany(
                {id_Receiver: req.params.id},
                {$pull: {id_Receiver: req.params.id}}
            )
            await TaskModel.findByIdAndDelete(req.params.id);
            return response.successResponse(res, "Delete task success");
        } catch (err) {
            return response.errorResponse(res, "Delete task failed" + err);
        }
    }

    async update(req, res) {
        try {
            const task = await TaskModel.findById(req.params.id);
            const updateTask = await task.updateOne({$set: req.body});
            return response.successResponseWithData(res, "Update task success", updateTask);
        } catch (err) {
            return response.errorResponse(res, "Update task failed: " + err);
        }
    }

    async getAll(req, res) {
        try {
            const allTask = await TaskModel.find().populate("id_Receiver");
            return response.successResponseWithData(res, "Get all task success", allTask);
        } catch (err) {
            return response.errorResponse(res, "Get all failed: " + err);
        }
    }

    async getATask(req, res) {
        try {
            const task = await TaskModel.findById(req.params.id)
                .populate("id_Receiver");
            response.successResponseWithData(res, "Get task success", task);
        } catch (err) {
            response.errorResponse(res, "Get task failed: " + err);
        }
    }
}

module.exports = new TaskController()