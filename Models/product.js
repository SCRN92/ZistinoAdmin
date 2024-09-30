const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, default: "" },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    category: { type: String, default: "" },
    inventory: { type: Number, default: 0 },
    description: { type: String, default: "" }
})

module.exports = mongoose.model('product_zistino', productSchema);