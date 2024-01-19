const msgModel = require("../models/msgModel")

exports.getNotification = async(req,res)=>{
    try {
        
        // get the user,s id
        const id = req.user.userId

        // find the history by the user's id
        const notify = await msgModel.findOne({userId:id})
        if (!notify) {
            return res.status(404).json({
                message:"No available notification"
            })
        }

        // return the history
        res.status(200).json({
            data: notify
        })

    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}
