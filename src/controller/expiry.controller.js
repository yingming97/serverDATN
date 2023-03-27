const response = require('../helper/response')
const ProductModel = require('../models/product.model')
const ExpiryModel = require('../models/expiry.model')

class ExpiryController{
    async create(req, res){
        try {
            const expiry = new ExpiryModel(req.body)
            const saveExpiry = await expiry.save()
            if(req.body.product){
                const product = await ProductModel.findById(req.body.product)
                await product.updateOne({$push: {expires: saveExpiry._id}})
            } else {
                throw response.errorResponse(res, "Can not found product: " + req.body.product)
            }
            response.successResponseWithData(res, "Create expiry success", saveExpiry)
        } catch (e) {
            response.errorResponse(res, "Create expiry failed: " + e)
        }
    }

    async update(req, res){
        try {
            const expiry = await ExpiryModel.findById(req.params.id)
            if (expiry == null){
                throw response.errorResponse(res, "Can not found expiry with id: " + req.params.id)
                return null;
            }
            const updateExpiry = await expiry.updateOne({$set: req.body});
            response.successResponseWithData(res, "Update expiry success", updateExpiry)
        } catch (e) {
            response.errorResponse(res, "Update expiry failed: " + e)
        }
    }

    async delete(req, res){
        try {
            await ProductModel.updateOne(
                {expires: req.params.id},
                {$pull: {expires: req.params.id}}
            )
            await ProductModel.findByIdAndDelete(req.params.id)
            response.successResponse(res, "Delete expiry success")
        } catch (e) {
            response.errorResponse(res, "Delete expiry failed: " + e)
        }
    }

    async getAll(req,res){
        try {
            const pageSize = 10
            var page = req.query.page
            if (page) {
                const allExpiry = await ExpiryModel.find()
                    .populate('product')
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                return response.successResponseWithData(res, "Get all expiry success", allExpiry)
            } else {
                const allExpiry = await ExpiryModel.find()
                    .populate('product')
                    .limit(pageSize)
                return response.successResponseWithData(res, "Get all expiry success", allExpiry)
            }
        } catch (e) {
            response.errorResponse(res, "Get all expiry failed: " + e)
        }
    }

    async getAnExpiry(req, res){
        try {
            const expiry = await ExpiryModel.findById(req.params.id)
                .populate('product')
            response.successResponseWithData(res, "Get an expiry success", expiry)
        } catch (e) {
            response.errorResponse(res, "Get an expiry failed: " + e)
        }
    }
}

module.exports = new ExpiryController()