const ProductModel = require("../../models/product.model")

const productViewsController = {
    getAllProductPage: async (req, res) => {
        const allProduct = await ProductModel.find()
            .populate("industry")
            .populate("supplier")
            .populate("expires")
            .populate("productPrices")
        return res.render('./product/product', {data: allProduct})
    },
    detailProduct: async (req, res) => {
        const aProduct = await ProductModel.findById(req.params.id)
            .populate("industry")
            .populate("supplier")
            .populate("expires")
            .populate("productPrices")
        return res.render('./product/detailProduct', {data: aProduct})
    },
}

module.exports = productViewsController;