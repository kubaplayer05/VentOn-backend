const fs = require("fs")

let humidity = JSON.parse(fs.readFileSync("./data/humidity.json", "utf-8"))

exports.getAllHumidities = (req, res) => {
	res.status(200).json({
		status: "succes",
		data: humidity,
	})
}

exports.getActualHumidity = (req, res) => {
	res.status(200).json({
		status: "sucess",
		data: humidity.actual,
	})
}

exports.updateActualHumidity = (req, res) => {
	if (!req.body.humidity) {
		return res.status(400).json({
			status: "fail",
			message: "Bad request",
		})
	}

	const actual = req.body.humidity
	humidity.actual = actual
	fs.writeFile("./data/humidity.json", JSON.stringify(humidity), err => {
		res.status(200).json({
			status: "sucess",
			data: humidity,
		})
	})
}

exports.getMinimalHumidity = (req, res) => {
	res.status(200).json({
		status: "succes",
		data: humidity.minimal,
	})
}

exports.setMinimalHumidity = (req, res) => {
	if (!req.body.humidity) {
		return res.status(400).json({
			status: "fail",
			message: "Bad request",
		})
	}

	const minimal = req.body.humidity
	humidity.minimal = minimal

	fs.writeFile("./data/humidity.json", JSON.stringify(humidity), err => {
		res.status(200).json({
			status: "sucess",
			data: humidity.minimal,
		})
	})
}
