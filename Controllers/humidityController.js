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

exports.addNewHumidity = (req, res) => {
	if (!req.body.humidity && !req.body.time) {
		return res.status(400).json({
			status: "fail",
			message: "Bad request",
		})
	}

	const value = req.body.humidity
	const date = { day: new Date().getDate(), month: new Date().getMonth() + 1 }
	const time = req.body.time

	humidity.humidities.daily.push({ value: value, date: date, time: time })
	humidity.humidities.weekly.push({ value: value, date: date, time: time })

	fs.writeFile("./data/humidity.json", JSON.stringify(humidity), err => {
		res.status(200).json({
			status: "sucess",
			data: humidity,
		})
	})
}
