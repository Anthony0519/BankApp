const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/userModel")
const bettingModel = require("../models/bettingModel")

exports.betting = async(req,res)=>{
    try {

        // get the user's id
        const Id = req.user.userId

        // find the user
        const user = await userModel.findById(Id)

        // get the details for transaction
        const {amount,pin,betId} = req.body

        // confirm the pin
        if (user.Pin !== pin) {
            return res.status(400).json({
                message:"incorrect pin"
            })
        }

        // check if the user's balance is sufficient to the inputed amount
        if (user.acctBalance < amount) {
            return res.status(400).json({
                message:"insufficient funds"
            })
        }

    // deduct amount from user's balance and save
    const minus = user.acctBalance - amount
    user.acctBalance = minus
    await user.save()

    //    save the transaction
        const betting = new bettingModel({
            user:user._id,
            betId,
            amount
        })
        await betting.save()
        // save the electronics id to the user
        user.Transactions.push(betting._id)
        await user.save()

        // create a transaction history for the sender and save
        const History = new historyModel({
            userId:user._id,
            transactionType:betting.transactionType,
            to:betId,
            amount:`${amount}`,
        })
        await History.save()

        // create a notification msg for the sender and save
        if (minus) {
            // customize the notification msg
            const msg = `hi ${user.firstName} you just funded ${amount} naira to your betting account`
            const message = new msgModel({
                userId:user._id,
                msg
            })
            await message.save()
        }

        res.status(200).json({
            message:"payment Successfull"
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}