const msgModel = require("../models/msgModel")
const historyModel = require("../models/historyModel")
const userModel = require("../models/userModel")
const transferModel = require("../models/transferModel")

exports.transfer = async(req,res)=>{
    try {

        // get the sender's id
        const senderId = req.user.userId

        // find the sender
        const sender = await userModel.findById(senderId)

        // get the details for transaction
        const {Acct,amount,desc,pin} = req.body

        // check if the user has a pin
        if (sender.Pin === '0') {
            return res.status(400).json({
                message: 'unrecognised pin, kindly go to the setting to create a pin'
            })
        }

        // confirm the pin
        if (pin !== sender.Pin) {
            return res.status(400).json({
                message:"incorrect pin"
            })
        }

        // check for the existence of the account number
        const receiver = await userModel.findOne({acctNum:Acct})
        if (!receiver) {
            return res.status(404).json({
                message:"oops, you can only make transfer customer on this platform "
            })
        }

        // check if the sender's balance is sufficient to the inputed amount
        if (sender.acctBalance < amount) {
            return res.status(400).json({
                message:"insufficient funds"
            })
        }

    //     // deduct amount from the sender's balance
    //    const minus = await userModel.updateOne({_id:senderId},{$inc:{acctBalance:-amount}})

    //     // add the amount to the receivers balance
    //    const add = await userModel.updateOne({acctNum:Acct},{$inc:{acctBalance: amount}})

    // deduct amount from senders balance and save
    const minus = sender.acctBalance - amount
    sender.acctBalance = minus
    await sender.save()

    // add the amount to the receiver's balance
    const add = receiver.acctBalance + amount
    receiver.acctBalance = add
    await receiver.save()


    //    save the transaction
        const Transfer = new transferModel({
            sender:sender._id,
            receiver:receiver._id,
            senderName:`${sender.firstName} ${sender.lastName}`,
            receiverName:`${receiver.firstName} ${receiver.lastName}`,
            desc,
            amount:amount
        })
        await Transfer.save()
        // save the transfer id to the user
        sender.Transactions.push(Transfer._id)
        await sender.save()

        // create a transaction history for the sender and save
        const senderHistory = new historyModel({
            userId:sender._id,
            transactionType:Transfer.transactionType,
            amount:`${amount}`,
            from:`${sender.firstName} ${sender.lastName}`,
            to:`${receiver.firstName} ${receiver.lastName}`,
            desc,
        })
        await senderHistory.save()

        // create a transaction history for the receiver and save
        const receiverHistory = new historyModel({
            userId:receiver._id,
            transactionType:Transfer.transactionType,
            amount:`${amount}`,
            from:`${sender.firstName} ${sender.lastName}`,
            to:`${receiver.firstName} ${receiver.lastName}`,
            desc,
        })
        await receiverHistory.save()

        // create a notification msg for the sender and save
        if (minus) {
            // customize the notification msg
            const msg = `hi ${sender.firstName}, you have successfully transfered ${amount} naira to ${receiver.firstName} ${receiver.lastName}`
            const message1 = new msgModel({
                userId:sender._id,
                msg
            })
            await message1.save()
        }

        // create a notification msg for the receiver and save
        if (add) {
            // customize the notification msg
            const msg = `hi ${receiver.firstName}, you just received ${amount} naira from ${sender.firstName} ${sender.lastName}`
            const message2 = new msgModel({
                userId:receiver._id,
                msg
            })
            await message2.save()
        }

        res.status(200).json({
            message:"Transaction Successfull",
            data:{
                sender:sender.acctBalance,
                receiver:receiver.acctBalance
            }
        })
        
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}