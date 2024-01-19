const router = require("express").Router()
const { electronic } = require("../controllers/electronicsCon")
const authorization = require("../middleware/authorization")

router.put("/electronic",authorization,electronic)

module.exports = router