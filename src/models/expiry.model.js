const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ExpirySchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    expiryDate: Date,
    quantity: Number
}, {
    collection: 'Expiry',
    timestamps: true
})

const ExpiryModel = mongoose.model('Expiry', ExpirySchema)

module.exports = ExpiryModel