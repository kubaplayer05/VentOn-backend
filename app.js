const express = require("express")
const allRouter = require("./routes/allRouter")
const temperatureRouter = require("./routes/temperatureRouter")
const humidityRouter = require("./routes/humidityRouter")

let app = express()

app.use(express.json())

app.use("/api", allRouter)
app.use("/api/temperature", temperatureRouter)
app.use("/api/humidity", humidityRouter)

module.exports = app
