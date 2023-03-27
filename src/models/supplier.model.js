const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    supplierName: String,
    phoneNumber: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]

}, {collection: 'Supplier', timestamps: true})

const SupplierModel = mongoose.model("Supplier", SupplierSchema);

module.exports = SupplierModel;
