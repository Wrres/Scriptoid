const EXPRESS = require("express");

const SERVER = EXPRESS();

SERVER.use(EXPRESS.static("src/public"));

function runServer() {
	return new Promise((resolve, reject) => {
		SERVER.listen(3000, () => {
			console.log("Server is ready.");
			resolve(true);
		});
	});
}

module.exports = runServer;

