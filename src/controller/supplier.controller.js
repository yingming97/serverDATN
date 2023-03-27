const response = require("../helper/response")
const SupplierModel = require("../models/supplier.model")

class SupplierController {
    async create(req, res) {
        try {
            const supplier = new SupplierModel(req.body);
            const saveSupplier = await supplier.save();
            return response.successResponseWithData(res, "Insert supplier success", saveSupplier);
        } catch (err) {
            return response.errorResponse(res, "Insert supplier failed: " + err);
        }
    }

    async update(req, res) {
        try {
            const supplier = await SupplierModel.findById(req.params.id);
            const updateSupplier = await supplier.updateOne({$set: req.body});
            return response.successResponseWithData(res, "Update supplier success", updateSupplier);
        } catch (err) {
            return response.errorResponse(res, "Update supplier failed: " + err);
        }
    }

    async delete(req, res) {
        try {
            await SupplierModel.findByIdAndDelete(req.params.id);
            return response.successResponse(res, "Delete supplier success");
        } catch (err) {
            return response.errorResponse(res, "Delete supplier failed" + err);
        }
    }

    async getAll(req, res) {
        try {
            const pageSize = 10
            var page = req.query.page
            if (page) {
                const allSupplier = await SupplierModel.find()
                    .populate("products")
                    .skip((page - 1) * pageSize)
                    .limit(pageSize);
                return response.successResponseWithData(res, "Get all supplier success", allSupplier);
            } else {
                const allSupplier = await SupplierModel.find()
                    .populate("products")
                    .limit(pageSize);
                return response.successResponseWithData(res, "Get all supplier success", allSupplier);
            }
        } catch (err) {
            return response.errorResponse(res, "Get all failed: " + err);
        }
    }

    async getAnSupplier(req, res) {
        try {
            const supplier = await SupplierModel.findById(req.params.id).populate("products");
            return response.successResponseWithData(res, "Get supplier success", supplier);
        } catch (err) {
            return response.errorResponse(res, "Get an supplier failed: " + err);
        }
    }

}

module.exports = new SupplierController();