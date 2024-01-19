const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const transferSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Transfer"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    senderName:{
        type: String
    },
    receiverName:{
        type:String
    },
    amount:{
        type:Number
    },
    desc:{
        type:String
    },
    transferDate:{
        type:String,
        default:createdOn
    },
})

const transferModel = mongoose.model("transfer",transferSchema)

module.exports = transferModel