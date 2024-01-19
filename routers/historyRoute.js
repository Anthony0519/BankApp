const router = require("express").Router()
const { getAllHistory, transferHistory, depositHistory, withdrawHistory, bettingHistory, airtimeHistory } = require("../controllers/historyCon")
const authorization = require("../middleware/authorization")




router.get("/getallhistory",authorization,getAllHistory)
router.get("/transferhistory",authorization, transferHistory)
router.get("/deposithistory",authorization, depositHistory)
router.get("/withdrawhistory",authorization, withdrawHistory)
router.get("/airtimehistory",authorization, airtimeHistory)
router.get("/bettinghistory",authorization, bettingHistory)
router.get("/airtimehistory",authorization, airtimeHistory)

module.exports = router