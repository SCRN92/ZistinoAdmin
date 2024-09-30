const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    name: { type: String, default: "" },
    family: { type: String, default: "" },
    phoneNumber: { type: Number, default: 0 },
    address: { type: String, default: "" },
    userName: { type: String, default: "" },
    pass: { type: String, default: "" },
    nationalCode: { type: Number, default: 0 },
    dateOfBirth: { type:String, default: "" },
    numberPlates:{type:String,default:""},
    toPay:{type:Number,default:0},
    carModel:{type:String,default:""},
    description:{type:String,default:""}
})

module.exports = mongoose.model('driver_zistino', driverSchema);