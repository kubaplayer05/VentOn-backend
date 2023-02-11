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
