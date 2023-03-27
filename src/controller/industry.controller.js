const response = require("../helper/response")
const IndustryModel = require("../models/industry.model")

class IndustryController {
    async create(req, res) {
        try {
            const industry = new IndustryModel(req.body);
            const saveIndustry = await industry.save();
            response.successResponseWithData(res, "Insert industry success", saveIndustry);
        } catch (err) {
            response.errorResponse(res, "Insert industry failed: " + err);
        }
    }

    async update(req, res){
        try {
            const industry = await IndustryModel.findById(req.params.id);
            const updateIndustry = await industry.updateOne({$set: req.body});
            response.successResponseWithData(res, "Update industry success", updateIndustry);
        } catch (err){
            response.errorResponse(res, "Update industry failed: " + err);
        }
    }

    async delete(req, res){
        try {
            await IndustryModel.findByIdAndDelete(req.params.id);
            response.successResponse(res, "Delete industry sucess");
        } catch (err){
            response.errorResponse(res, "Delete industry failed" + err);
        }
    }

    async getAll(req, res) {
        try {
            const pageSize = 10
            var page = req.query.page
            if(page){
                page = parseInt(page)
                var skip = (page - 1) * pageSize
                const allIndustry = await IndustryModel.find().populate("products")
                    .skip(skip)
                    .limit(pageSize)
                response.successResponseWithData(res, "Get industry success with page" + req.query.page, allIndustry)
            } else {
                const allIndustry = await IndustryModel.find().populate("products").limit(pageSize)
                response.successResponseWithData(res, "Get all industry success", allIndustry);
            }
        } catch (err) {
            response.errorResponse(res, "Get all failed: " + err);
        }
    }

    async getAnIndustry(req, res) {
        try {
            const industry = await IndustryModel.findById(req.params.id).populate("products");
            response.successResponseWithData(res, "Get industry success", industry);
        } catch (err) {
            response.errorResponse(res, "Get an industry failed: " + err);
        }
    }

}

module.exports = new IndustryController();