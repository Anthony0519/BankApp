const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
    },
    acctNum: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    Pin: {
        type: String,
    },
    acctBalance:{
        type: Number,
        default: 0.00
    },
    Transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transfer'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'deposit'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'withdraw'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'airtime'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'electronics'
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bet'
        },
    ],
    blacklist : {
        type: Array,
        default: [],
    }
})

const userModel  = mongoose.model('user', userSchema)

module.exports = userModel


