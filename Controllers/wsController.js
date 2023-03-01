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

exports.setMinimalHum = hum => {
	humidity.minimal = hum
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

exports.sendPlan = (ws, jsonData, to) => {
	ws.clients.forEach(function each(client) {
		client.send(
			`{"head": "${jsonData.head}", "value": "", "to": "${to}", "start": "${jsonData.value.start}", "end": "${jsonData.value.end}", "day": "${jsonData.value.day}", "dayId": "${jsonData.value.dayId}"}`
		)
	})
}

exports.addEveryday = value => {
	let start = value.start
	let end = value.end
	let length = status.plan.everyday.length

	status.plan.everyday.data.push({ id: length + 1, start: start, end: end })

	status.plan.everyday.length = status.plan.everyday.data.length

	fs.writeFile("./data/status.json", JSON.stringify(status), err => {
		console.log(err)
	})
}

exports.addCustom = value => {
	let start = value.start
	let end = value.end
	let day = value.day
	let length = status.plan.custom[day].data.length

	status.plan.custom[day].data.push({ id: length + 1, start: start, end: end })

	status.plan.custom[day].length = status.plan.custom[day].data.length

	fs.writeFile("./data/status.json", JSON.stringify(status), err => {
		console.log(err)
	})
}
