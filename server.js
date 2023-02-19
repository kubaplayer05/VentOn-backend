/* TODO:
 * Change static files to database
 * add fetch functions to get the actual values
 *
 */
const ws = require("ws")
const app = require("./app")

const wsServer = new ws.Server({ noServer: true })
wsServer.on("connection", socket => {
	wsServer.clients.forEach(function each(client) {
		if (client.readyState === ws.OPEN) {
			client.send("Turn on")
		}
	})

	socket.on("message", function message(data) {
		console.log("received: %s", data)
	})
})

const port = 3000

const server = app.listen(port)

server.on("upgrade", (req, socket, head) => {
	wsServer.handleUpgrade(req, socket, head, socket => {
		wsServer.emit("connection", socket, req)
	})
})
