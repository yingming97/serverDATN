const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductPriceSchema = new Schema({
    sellPrice: Number,
    importPrice: Number,
    effectiveDate: Date,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
}, {
    collection: 'ProductPrice',
    timestamps: true
})

const ProductPriceModel = mongoose.model("ProductPrice", ProductPriceSchema);

module.exports = ProductPriceModel;