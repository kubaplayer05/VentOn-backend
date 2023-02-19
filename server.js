/* TODO:
 * Change static files to database
 * add fetch functions to get the actual values
 *
 */
const ws = require("ws")
const app = require("./app")

const port = 3000

app.listen(port, () => {
	console.log("Server has started")
})
