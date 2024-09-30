const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneRequestSchema = new Schema({
    fullName: { type: String, default: "" },
    address: { type: String, default: "" },
    phoneNumber: { type: Number, default: 0 },
    amountOfLoad: { type: Number, default: 0 },
    category: { type: String, default:  ""},
    driver: { type: String, default: "" },
    timeRange: { type: String, default: "" },
    description: { type: String, default: "" }
})

module.exports = mongoose.model('phoneRequest_zistino', phoneRequestSchema);