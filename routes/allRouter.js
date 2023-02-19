const express = require("express")
const allController = require("../Controllers/allController")

const router = express.Router()

router.route("/").get(allController.getAllInformation)

module.exports = router
