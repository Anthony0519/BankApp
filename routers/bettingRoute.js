const router = require("express").Router()
const { betting } = require("../controllers/bettingCon")
const authorization = require("../middleware/authorization")




router.put("/betting",authorization,betting)

module.exports = router