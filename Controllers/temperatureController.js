const fs = require("fs")

let temperature = JSON.parse(
	fs.readFileSync("./data/temperature.json", "utf-8")
)

exports.getAllTemperatures = (req, res) => {
	res.status(200).json({
		status: "succes",
		data: temperature,
	})
}

exports.getActualTemperature = (req, res) => {
	res.status(200).json({
		status: "sucess",
		data: temperature.actual,
	})
}

exports.updateActualTemperature = (req, res) => {
	if (!req.body.temperature) {
		return res.status(400).json({
			status: "fail",
			message: "Bad request",
		})
	}

	const actual = req.body.temperature
	temperature.actual = actual
	fs.writeFile("./data/temperature.json", JSON.stringify(temperature), err => {
		res.status(200).json({
			status: "sucess",
			data: temperature,
		})
	})
}

exports.addNewTemperature = (req, res) => {
	if (!req.body.temperature && !req.body.time) {
		return res.status(400).json({
			status: "fail",
			message: "Bad request",
		})
	}

	const value = req.body.temperature
	const date = { day: new Date().getDate(), month: new Date().getMonth() + 1 }
	const time = req.body.time

	temperature.temperatures.daily.push({ value: value, date: date, time: time })
	temperature.temperatures.weekly.push({ value: value, date: date, time: time })

	fs.writeFile("./data/temperature.json", JSON.stringify(temperature), err => {
		res.status(200).json({
			status: "sucess",
			data: temperature,
		})
	})
}
