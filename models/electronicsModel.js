const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const electricSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Electronic Bill"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    meterNo:{
        type:Number
    },
    amount:{
        type:Number
    },
    paymentDate:{
        type:String,
        default:createdOn
    }
})

const electronicModel = mongoose.model("electronics",electricSchema)

module.exports = electronicModel