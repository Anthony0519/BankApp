const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const historySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    transactionType:{
        type:String
    },
    amount:{
        type:String
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    desc:{
        type:String
    },
    date:{
        type:String,
        default:createdOn
    },
})

const historyModel = mongoose.model("history",historySchema)

module.exports = historyModel