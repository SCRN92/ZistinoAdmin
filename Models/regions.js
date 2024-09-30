const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionsSchema = new Schema({
    name: { type: String, default: "" },
    address: { type: String, default: "" }
})

module.exports = mongoose.model('regions_zistino', regionsSchema);