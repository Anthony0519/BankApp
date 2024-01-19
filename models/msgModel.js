const mongoose = require("mongoose")
const {DateTime} = require('luxon')

const createdOn = DateTime.now().toLocaleString({weekday:"short",month:"short",day:"2-digit", year:"numeric", hour:"2-digit",minute:"2-digit"})

const notificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    msg:{
        type:String,
    },
    Date:{
        type:String,
        default:createdOn
    },
})

const msgModel = mongoose.model("notification",notificationSchema)

module.exports = msgModel