const router = require("express").Router()
const { withdraw } = require("../controllers/withdrawCon")
const authorization = require("../middleware/authorization")

router.put("/withdraw",authorization,withdraw)

module.exports = router