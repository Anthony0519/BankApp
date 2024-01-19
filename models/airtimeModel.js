const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const airtimeSchema = new mongoose.Schema({
    transactionType:{
        type:String,
        default:"Airtime"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    network:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentDate:{
        type:String,
        default:createdOn
    }
})

const airtimeModel = mongoose.model("airtime",airtimeSchema)

module.exports = airtimeModel