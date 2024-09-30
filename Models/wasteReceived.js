const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wasteReceivedSchema = new Schema({
    driver: { type: String, default: "" },
    customer: { type: String, default: "" },
    weight: { type: String, default: "" },
    category: { type: String, default: "" },
    description: { type: String, default: "" },
    total: { type: String, default: "" },
})

module.exports = mongoose.model('wasteRecevived_zistino', wasteReceivedSchema);