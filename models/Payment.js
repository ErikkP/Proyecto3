const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        
    },
    cart: {
        type: Array,
        default: [],
    }
})

module.exports = mongoose.model("Payment", paymentSchema)