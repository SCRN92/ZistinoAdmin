const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    userId: { type: String, default: "" },
    fullName: { type: String, default: "" },
    address: { type: String, default: "" },
    phoneNumber: { type: Number, default: 0 },
    amountOfLoad: { type: Number, default: 0 },
    category: { type: String, default: "" },
    status: { type: Number, default: 0 },
    driver: { type: String, default: "" },
    timeRange: { type: String, default: "" },
    rejectionDetails: { type: String, default: "" },
    description: { type: String, default: "" },
    isManual: { type: Boolean, default: false }
})

module.exports = mongoose.model('orders_zistino', ordersSchema);