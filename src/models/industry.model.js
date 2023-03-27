const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndustrySchema = new Schema({
    industryName:String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],

},{
    collection: 'Industry',
    timestamps: true
})

const IndustryModel = mongoose.model("Industry", IndustrySchema);

module.exports = IndustryModel;