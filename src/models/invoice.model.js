const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema({
        totalPrice: Number,
        invoiceType: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        dateCreated: Date,
        invoiceDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "InvoiceDetail"
            }
        ]
    },
    {
        collection: "Invoices",
        timestamps: true
    }
);

const InvoiceModel = mongoose.model('Invoices', InvoiceSchema);

module.exports = InvoiceModel