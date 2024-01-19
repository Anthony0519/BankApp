const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/userModel")
const electronicsModel = require("../models/electronicsModel")
exports.electronic = async(req,res)=>{
    try {

        // get the user's id
        const Id = req.user.userId

        // find the user
        const user = await userModel.findById(Id)

        // get the details for transaction
        const {amount,pin,meterNo} = req.body

        const newAmount = Number(amount)


         // check if the user has a pin
         if (user.Pin === '0') {
            return res.status(400).json({
                message: 'unrecognised pin, kindly go to the setting to create a pin'
            })
        }

        // confirm the pin
        if (user.Pin !== pin) {
            return res.status(400).json({
                message:"incorrect pin"
            })
        }

        // check if the user's balance is sufficient to the inputed amount
        if (user.acctBalance < newAmount) {
            return res.status(400).json({
                message:"insufficient funds"
            })
        }

    // deduct newAmount from user's balance and save
    const minus = user.acctBalance - newAmount
    user.acctBalance = minus
    await user.save()

    //    save the transaction
        const electronics = new electronicsModel({
            user:user._id,
            meterNo,
            amount
        })
        await electronics.save()
        // save the electronics id to the user
        user.Transactions.push(electronics._id)
        await user.save()

        // create a transaction history for the sender and save
        const History = new historyModel({
            userId:user._id,
            transactionType:electronics.transactionType,
            to:meterNo,
            amount:`-${newAmount}`,
        })
        await History.save()

        // create a notification msg for the sender and save
        if (minus) {
            // customize the notification msg
            const msg = `hi ${user.firstName} you just paid ${newAmount} naira to your electricity bills`
            const message = new msgModel({
                userId:user._id,
                msg
            })
            await message.save()
        }

        res.status(200).json({
            message:"payment Successfull",
            data: user.acctBalance
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}