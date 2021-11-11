const express = require("express");

const server = express();

server.use(express.static("public"));

function keepAlive() {
	return new Promise((resolve, reject) => {
		server.listen(3000, () => {
			console.log("Server is ready.");
			resolve(true);
		});
	});
}

module.exports = keepAlive;