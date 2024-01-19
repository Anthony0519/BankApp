const router = require("express").Router()
const { deposit } = require("../controllers/depositeCon")
const authorization = require("../middleware/authorization")

router.put("/deposit",authorization,deposit)

module.exports = router