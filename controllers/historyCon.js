const historyModel = require("../models/historyModel")
const transferModel = require("../models/transferModel")
const electronicsModel = require("../models/electronicsModel")
const withdrawModel = require("../models/withdrawModel")
const depositModel = require("../models/depositModel")
const bettingModel = require("../models/bettingModel")

exports.getAllHistory = async(req,res)=>{
    try {
        
        // get the user,s id
        const id = req.user.userId

        // find the history by the user's id
        const history = await historyModel.findOne({userId:id})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }

        // return the history
        res.status(200).json({
            data: history
        })

    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.transferHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await transferModel.findOne({$or:[{sender:id},{receiver:id}]})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }

      // return the history
        res.status(200).json({
            data: {
                type:history.transactionType,
                from:history.senderName,
                to:history.receiverName,
                amount:history.amount,
                description:history.desc,
                transferDate:history.transferDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}
exports.withdrawHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await withdrawModel.findOne({user:id})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }

      // return the history
        res.status(200).json({
            data: {
                type:history.transactionType,
                amount:history.amount,
                withdrawDate:history.withdrawDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}
exports.depositHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await depositModel.findOne({$or:[{sender:id},{receiver:id}]})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }

      // return the history
        res.status(200).json({
            data: {
                type:history.transactionType,
                amount:history.amount,
                depositDate:history.depositDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}
exports.electronicsHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await electronicsModel.findOne({user:id})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }


      // return the history
        res.status(200).json({
            data: {
                type:history.transactionType,
                meterNum:history.meterNo,
                paymentDate:history.paymentDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.bettingHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await bettingModel.findOne({user:id})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }


      // return the history
        res.status(200).json({
            data: {
                type:history.transactionType,
                betId:history.betId,
                paymentDate:history.paymentDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.airtimeHistory = async(req,res)=>{
    try {

        // get the user's id
        const id = req.user.userId

        // get the history
        const history = await airtimeModel.findOne({user:id})
        if (!history) {
            return res.status(404).json({
                message:"you don't have any history yet"
            })
        }


      // return the history
        res.status(200).json({
            data: {
                // type:history.transactionType,
                
                userId:user._id,
                transactionType:airtime.transactionType,
                phoneNumber:history.phoneNumber,
                paymentDate:history.paymentDate
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}