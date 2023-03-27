const response = require("../helper/response");
const ProductModel = require("../models/product.model");
const IndustryModel = require("../models/industry.model");
const SupplierModel = require("../models/supplier.model");

class ProductController {
    async create(req, res) {
        try {
            const product = new ProductModel(req.body);
            const saveProduct = await product.save();
            if (req.body.industry) {
                const industry = await IndustryModel.findById(req.body.industry);
                await industry.updateOne({$push: {products: saveProduct._id}});
            } else {
                return response.errorResponse(
                    res,
                    "Can not found industry: " + req.body.industry
                );
            }
            if (req.body.supplier) {
                const supplier = await SupplierModel.findById(req.body.supplier);
                await supplier.updateOne({$push: {products: saveProduct._id}});
            } else {
                return response.errorResponse(
                    res,
                    "Can not found supplier: " + req.body.supplier
                );
            }

            return response.successResponseWithData(
                res,
                "Create product success",
                saveProduct
            );
        } catch (err) {
            return response.errorResponse(res, "Create product failed: " + err);
        }
    }

    async delete(req, res) {
        try {
            await IndustryModel.updateMany(
                {products: req.params.id},
                {$pull: {products: req.params.id}}
            );
            await SupplierModel.updateMany(
                {products: req.params.id},
                {$pull: {products: req.params.id}}
            );
            await ProductModel.findByIdAndDelete(req.params.id);
            response.successResponse(res, "Delete product success");
        } catch (err) {
            response.errorResponse(res, "Delete product failed: " + err);
        }
    }

    async update(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id);

            if (product == null) {
                throw response.errorResponse(
                    res,
                    "Can not found product with id: " + req.params.id
                );
                return null;
            }
            const updateProduct = await product.updateOne({$set: req.body});
            response.successResponseWithData(
                res,
                "Update product success",
                updateProduct
            );
        } catch (err) {
            response.errorResponse(res, "Update product failed: " + err);
        }
    }

    async getAll(req, res) {
        try {
            const pageSize = 10;
            var page = req.query.page;
            if (page) {
                const allProduct = await ProductModel.find()
                    .populate("industry")
                    .populate("supplier")
                    .skip((page - 1) * pageSize)
                    .limit(pageSize);
                return response.successResponseWithData(
                    res,
                    "Get all product success",
                    allProduct
                );
            } else {
                const allProduct = await ProductModel.find()
                    .populate("industry")
                    .populate("supplier")
                    .limit(pageSize);
                return response.successResponseWithData(
                    res,
                    "Get all product success",
                    allProduct
                );
            }
        } catch (err) {
            response.errorResponse(res, "Get all product failed: " + err);
        }
    }

    async getAProduct(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id)
                .populate("industry")
                .populate("supplier");
            response.successResponseWithData(res, "Get product success", product);
        } catch (err) {
            response.errorResponse(res, "Get product failed: " + err);
        }
    }
}

module.exports = new ProductController();
