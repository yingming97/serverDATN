const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: String,
    barcode: String,
    industry: {
        type: String,
        ref: "Industry"
    },
    supplier: {
        type: String,
        ref: "Supplier"
    },
    invoiceDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InvoiceDetail"
        }
    ],
    productPrices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductPrice'
        }
    ],
    expires: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expiry'
        }
    ],
    img_product: String
}, {
    collection: 'Product',
    timestamps: true
})

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;