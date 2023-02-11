const express = require("express")
const temperatureController = require("../Controllers/temperatureController")

const router = express.Router()

router.route("/").get(temperatureController.getAllTemperatures)
router
	.route("/actual")
	.get(temperatureController.getActualTemperature)
	.patch(temperatureController.updateActualTemperature)

module.exports = router
