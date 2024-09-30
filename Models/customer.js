const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: string, default: "" },
    family: { type: string, default: "" },
    phoneNumber: { type: number, default: 0 },
    address: { type: string, default: "" },
    nationalCode: { type: number, default: 0 },
    dateOfBirth: { type:string, default: "" },
    toPay:{type:number,default:0}
})

module.exports = mongoose.model('customer_zistino', customerSchema);