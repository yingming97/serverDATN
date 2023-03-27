const TaskModel = require("../../models/task.model")
const taskViewsController = {

    getTasksPage: async (req, res) => {
        const allTask = await TaskModel.find()
            .populate('idReceiver')
            .populate('idCreator');
        return res.render('./task/tasks', {data: allTask})
    },
    getDetailTasksPage: async (req, res) => {
        const aTask = await TaskModel.findById(req.params.id)
            .populate('idReceiver')
            .populate('idCreator');
        return res.render('./task/tasksDetail', {data: aTask})
    },
}

module.exports = taskViewsController;