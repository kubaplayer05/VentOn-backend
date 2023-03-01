const fs = require("fs")

let status = JSON.parse(fs.readFileSync("./data/status.json", "utf-8"))

exports.getStatus = (req, res) => {
	res.status(200).json({
		status: "succes",
		data: status,
	})
}

exports.getEveryday = (req, res) => {
	let length = status.plan.everyday.data.length
	status.plan.everyday.length = length
	let data = status.plan.everyday

	res.status(200).json({
		status: "succes",
		data: data,
	})
}

exports.getCustom = (req, res) => {
	let data = status.plan.custom
	res.status(200).json({
		status: "succes",
		data: data,
	})
}

exports.deleteEveryday = (req, res) => {
	status = JSON.parse(fs.readFileSync("./data/status.json", "utf-8"))
	let id = req.params.id * 1
	let everydayPlan = status.plan.everyday.data
	let hourToDelate = everydayPlan.find(el => el.id === id)

	let index = everydayPlan.indexOf(hourToDelate)
	everydayPlan.splice(index, 1)

	status.plan.everyday.data = everydayPlan

	status.plan.everyday.length = status.plan.everyday.data.length

	fs.writeFile("./data/status.json", JSON.stringify(status), err => {
		res.status(204).json({
			status: "success",
			data: status,
		})
	})
}

exports.deleteCustom = (req, res) => {
	status = JSON.parse(fs.readFileSync("./data/status.json", "utf-8"))
	let day = req.params.day
	let id = req.params.id * 1
	let customPlan = status.plan.custom[day].data

	let hourToDelate = customPlan.find(el => el.id === id)
	let index = customPlan.indexOf(hourToDelate)

	status.plan.custom[day].data.splice(index, 1)

	status.plan.custom[day].length = status.plan.custom[day].data.length

	fs.writeFile("./data/status.json", JSON.stringify(status), err => {
		res.status(204).json({
			status: "success",
			data: status,
		})
	})
}
