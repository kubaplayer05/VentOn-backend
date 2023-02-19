const fs = require("fs")

let humidity = JSON.parse(fs.readFileSync("./data/humidity.json", "utf-8"))
let temperature = JSON.parse(
	fs.readFileSync("./data/temperature.json", "utf-8")
)

let all = Object.assign(temperature, humidity)

exports.getAllInformation = (req, res) => {
	res.status(200).json({
		status: "succes",
		data: all,
	})
}
