const express = require("express")
const statusController = require("../Controllers/statusController")

const router = express.Router()

router.route("/").get(statusController.getStatus)
router.route("/everyday").get(statusController.getEveryday)
router.route("/everyday/:id").delete(statusController.deleteEveryday)
router.route("/custom").get(statusController.getCustom)
router.route("/custom/:day/:id").delete(statusController.deleteCustom)

module.exports = router
