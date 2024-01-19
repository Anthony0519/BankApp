const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const withdrawSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Withdraw"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    amount:{
        type:Number
    },
    withdrawDate:{
        type:String,
        default:createdOn
    },
})

const withdrawModel = mongoose.model("withdraw",withdrawSchema)

module.exports = withdrawModel