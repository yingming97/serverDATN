const response = require('../helper/response')
const ProductModel = require('../models/product.model')
const ProductPriceModel = require('../models/productPrice.model')

class ProductPriceController{
    async create(req, res){
        try {
            const productPrice = new ProductPriceModel(req.body)
            const saveProductPrice = await productPrice.save()
            if(req.body.product){
                const product = await ProductModel.findById(req.body.product)
                await product.updateOne({$push: {productPrices: saveProductPrice._id}})
            } else {
                throw response.errorResponse(res, "Can not found product: " + req.body.product)
            }
            response.successResponseWithData(res, "Create product price success", saveProductPrice)
        } catch (e) {
            response.errorResponse(res, "Create product price failed: " + e)
        }
    }

    async getAll(req,res){
        try {
            const pageSize = 10
            var page = req.query.page
            if (page) {
            const allProductPrice = await ProductPriceModel.find()
                .populate('product')
                .skip((page - 1) * pageSize)
                .limit(pageSize)
            response.successResponseWithData(res, "Get all product price success", allProductPrice)
            } else {
                const allProductPrice = await ProductPriceModel.find()
                    .populate('product')
                    .limit(pageSize)
                response.successResponseWithData(res, "Get all product price success", allProductPrice)
            }
        } catch (e) {
            response.errorResponse(res, "Get all product price failed: " + e)
        }
    }

    async getAProductPrice(req, res){
        try {
            const productPrice = await ProductPriceModel.findById(req.params.id)
                .populate('product')
            response.successResponseWithData(res, "Get an product price success", productPrice)
        } catch (e) {
            response.errorResponse(res, "Get an product price failed: " + e)
        }
    }
}

module.exports = new ProductPriceController()