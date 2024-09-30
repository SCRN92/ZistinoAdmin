const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, default: "" },
    price: { type: String, default: "0" },
    min: { type: String, default: "0" },
    max: { type: String, default: "0" }
})

module.exports = mongoose.model('category_zistino', categorySchema);