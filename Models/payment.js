const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    userId: { type: String, default: "" },
    phone: { type: String, default: "" },
    amount: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('payment_zistino', paymentSchema);