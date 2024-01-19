const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/userModel")
const withdrawModel = require("../models/withdrawModel")
exports.withdraw = async(req,res)=>{
    try {

        // get the sender's id
        const Id = req.user.userId

        // find the sender
        const withdrawal = await userModel.findById(Id)

        // get the details for transaction
        const {amount,pin} = req.body

        // check if the user has a pin
         if (withdrawal.Pin === '0') {
            return res.status(400).json({
                message: 'unrecognised pin, kindly go to the setting to create a pin'
            })
        }

        // confirm the pin
        if (pin !== withdrawal.Pin) {
            return res.status(400).json({
                message:"incorrect pin"
            })
        }

        // check if the sender's balance is sufficient to the inputed amount
        if (withdrawal.acctBalance < amount) {
            return res.status(400).json({
                message:"insufficient funds"
            })
        }

    // deduct amount from withdrawal balance and save
    const minus = withdrawal.acctBalance - amount
    withdrawal.acctBalance = minus
    await withdrawal.save()

    //    save the transaction
        const withdraw = new withdrawModel({
            user:withdrawal._id,
            amount:amount
        })
        await withdraw.save()
        // save the transfer id to the user
        withdrawal.Transactions.push(withdraw._id)
        await withdrawal.save()

        // create a transaction history for the sender and save
        const History = new historyModel({
            userId:withdrawal._id,
            transactionType:withdraw.transactionType,
            amount:`${amount}`,
        })
        await History.save()

        // create a notification msg for the sender and save
        if (minus) {
            // customize the notification msg
            const msg = `hi ${withdrawal.firstName} ${withdrawal.lastName.slice(0,1).toUpperCase()}, you just withdrew ${amount} from your balance`
            const message = new msgModel({
                userId:withdrawal._id,
                msg
            })
            await message.save()
        }

        res.status(200).json({
            message:"withdrawal Successfull",
            data: withdrawal.acctBalance
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}