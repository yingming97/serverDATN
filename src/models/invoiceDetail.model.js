const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceDetailSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoices'
    },
    quantity: Number,
    price: Number
}, {
    collection: 'InvoiceDetail',
    timestamps: true
})

const InvoiceDetailModel = mongoose.model("InvoiceDetail", InvoiceDetailSchema)

module.exports = InvoiceDetailModel