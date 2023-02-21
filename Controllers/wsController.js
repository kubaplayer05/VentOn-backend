const fs = require("fs")

let status = JSON.parse(fs.readFileSync("./data/status.json", "utf-8"))
let temperature = JSON.parse(
	fs.readFileSync("./data/temperature.json", "utf-8")
)
let humidity = JSON.parse(fs.readFileSync("./data/humidity.json", "utf-8"))

exports.setPower = power => {
	status.power = `${power}`
	fs.writeFile("./data/status.json", JSON.stringify(status), err => {
		console.log(err)
	})
}

exports.setActualTemp = temp => {
	temperature.actual = temp
	fs.writeFile("./data/temperature.json", JSON.stringify(temperature), err => {
		console.log(err)
	})
}

exports.setActualHum = hum => {
	humidity.actual = hum
	fs.writeFile("./data/humidity.json", JSON.stringify(humidity), err => {
		console.log(err)
	})
}

exports.sendMsg = (ws, jsonData, to) => {
	ws.clients.forEach(function each(client) {
		client.send(
			`{"head": "${jsonData.head}", "value": "${jsonData.value}", "to": "${to}"}`
		)
	})
}
