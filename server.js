const ws = require("ws")
const app = require("./app")
const wsController = require("./Controllers/wsController")
const wsServer = new ws.Server({ noServer: true })

wsServer.on("connection", socket => {
	wsServer.clients.forEach(function each(client) {
		if (client.readyState === ws.OPEN) {
		}
	})

	socket.on("message", function message(data) {
		try {
			let jsonData = JSON.parse(data)
			if (jsonData.from === "esp8266") {
				switch (jsonData.head) {
					case "power":
						wsController.setPower(jsonData.value)
						wsController.sendMsg(wsServer, jsonData, "website")
						break

					case "temp":
						wsController.setActualTemp(jsonData.value)
						wsController.sendMsg(wsServer, jsonData, "website")
						break

					case "hum":
						wsController.setActualHum(jsonData.value)
						wsController.sendMsg(wsServer, jsonData, "website")
						break
				}
			} else if (jsonData.from === "website") {
				switch (jsonData.head) {
					case "power":
						wsController.setPower(jsonData.value)
						wsController.sendMsg(wsServer, jsonData, "esp8266")
						break

					case "minHum":
						// TODO: add minimum Humidity handler
						break

					case "planEveryday":
						// TODO: add everyday plan handler
						break

					case "planCustom":
						// TODO: add custom plna handler
						break
				}
			}
		} catch (err) {
			console.error(err)
		}
	})
})

const port = 3000
const server = app.listen(port)

server.on("upgrade", (req, socket, head) => {
	wsServer.handleUpgrade(req, socket, head, socket => {
		wsServer.emit("connection", socket, req)
	})
})
