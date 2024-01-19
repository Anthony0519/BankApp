const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/userModel")
const depositModel = require("../models/depositModel")


exports.deposit = async(req,res)=>{
    try {
        // get the depositor's id
        const Id = req.user.userId

        // find the depositor
        const depositor = await userModel.findById(Id)

        // get the details for transaction
        const {amount,pin} = req.body

        // confirm the pin
        if (pin !== depositor.Pin) {
            return res.status(400).json({
                message:"incorrect pin"
            })
        }

    // deduct amount from withdrawal balance and save
    const add = depositor.acctBalance + amount
    depositor.acctBalance = add
    await depositor.save()

    //    save the transaction
        const deposit = new depositModel({
            user:depositor._id,
            amount:`${amount}`
        })
        await deposit.save()
        // save the transfer id to the user
        depositor.Transactions.push(deposit._id)
        await depositor.save()

        // create a transaction history for the sender and save
        const History = new historyModel({
            userId:depositor._id,
            transactionType:deposit.transactionType,
            amount:`${amount}`,
        })
        await History.save()

        // create a notification msg for the sender and save
        if (add) {
            // customize the notification msg
            const msg = `hi ${depositor.firstName} ${depositor.lastName.slice(0,1).toUpperCase()}, you just deposited ${amount} to your balance`
            const message = new msgModel({
                userId:depositor._id,
                msg
            })
            await message.save()
        }

        res.status(200).json({
            message:"deposit Successfull"
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}