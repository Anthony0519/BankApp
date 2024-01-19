const router = require("express").Router()
const { transfer } = require("../controllers/transferCon")
const authorization = require("../middleware/authorization")

router.put("/transfer",authorization,transfer)

module.exports = router