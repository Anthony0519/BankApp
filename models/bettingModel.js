const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const betSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Betting"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    amount:{
        type:Number
    },
    betId:{
        type:String
    },
    paymentDate:{
        type:String,
        default:createdOn
    }
})

const bettingModel = mongoose.model("bet",betSchema)

module.exports = bettingModel