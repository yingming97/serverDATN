const mongoose = require("mongoose")

const StatsSchema = mongoose.Schema({
        amount: Number,
        price: Number,
        startDate: Date,
        endDate: Date,
    },
    {
        collection: "Stats",
    })