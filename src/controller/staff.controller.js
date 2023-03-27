const response = require("../helper/response")
const StaffModel = require("../models/staff.model")

class StaffController {
    async create(req, res) {
        try {
            const staffModel = new StaffModel(req.body);
            const saveStaff = await staffModel.save();
            return response.successResponseWithData(res, "Insert staff success", saveStaff);
        } catch (err) {
            return response.errorResponse(res, "Insert staff failed: " + err);
        }
    }

    async update(req, res) {
        try {
            const staff = await StaffModel.findById(req.params.id);
            const updateStaff = await staff.updateOne({$set: req.body});
            return response.successResponseWithData(res, "Update staff success", updateStaff);
        } catch (err) {
            return response.errorResponse(res, "Update staff failed: " + err);
        }
    }

    async delete(req, res) {
        try {
            await StaffModel.findByIdAndDelete(req.params.id);
            return response.successResponse(res, "Delete staff success");
        } catch (err) {
            return response.errorResponse(res, "Delete staff failed" + err);
        }
    }

    async getAll(req, res) {
        try {
            const allStaff = await StaffModel.find().populate("Task");
            return response.successResponseWithData(res, "Get all staff success", allStaff);
        } catch (err) {
            return response.errorResponse(res, "Get all failed: " + err);
        }
    }

    async getAnSupplier(req, res) {
        try {
            const staff = await StaffModel.findById(req.params.id).populate("Task");
            return response.successResponseWithData(res, "Get supplier success", staff);
        } catch (err) {
            return response.errorResponse(res, "Get an supplier failed: " + err);
        }
    }

}

module.exports = new StaffController();