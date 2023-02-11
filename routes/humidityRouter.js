const express = require("express")
const humidityController = require("../Controllers/humidityController")

const router = express.Router()

router.route("/").get(humidityController.getAllHumidities)
router
	.route("/actual")
	.get(humidityController.getActualHumidity)
	.patch(humidityController.updateActualHumidity)
router
	.route("/minimal")
	.get(humidityController.getMinimalHumidity)
	.patch(humidityController.setMinimalHumidity)

module.exports = router
