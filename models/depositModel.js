const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})


const depositeSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Deposit"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    amount:{
        type:Number
    },
    depositDate:{
        type:String,
        default:createdOn
    }
})

const depositeModel = mongoose.model("deposit",depositeSchema)

module.exports = depositeModel