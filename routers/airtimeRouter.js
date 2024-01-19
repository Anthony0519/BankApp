const router = require("express").Router()
const { airtime } = require("../controllers/airtimeCon")
const authorization = require("../middleware/authorization")




router.put("/airtime",authorization,airtime)

module.exports = router