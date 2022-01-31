const CITIES = require("./natc-data.json");

const NATC = {
	getAll() {
		return CITIES;
	},
	getAllWithKeys() {
		return CITIES.map((entry) => {
			return {
				"name": entry[0],
				"local": entry[1],
				"lat": entry[2],
				"lng": entry[3],
				"code": entry[4],
				"subcode": entry[5],
				"population": entry[6],
				"continent": entry[7]
			}
		});
	},
	getAllWithCustomKeys(keys) {
		return CITIES.map((entry) => {
			let data = {};
			if (keys.includes("name")) {
				data.name = entry[0];
			}
			if (keys.includes("local")) {
				data.local = entry[1];
			}
			if (keys.includes("lat")) {
				data.lat = entry[2];
			}
			if (keys.includes("lng")) {
				data.lng = entry[3];
			}
			if (keys.includes("code")) {
				data.code = entry[4];
			}
			if (keys.includes("subcode")) {
				data.subcode = entry[5];
			}
			if (keys.includes("population")) {
				data.population = entry[6];
			}
			if (keys.includes("continent")) {
				data.continent = entry[6];
			}
			return data;
		});
	},
	getOver(population) {
		return CITIES.filter((city) => city[6] >= population);
	},
	getOverWithKeys(population) {
		let filtered = CITIES.filter((city) => city[6] >= population);
		return filtered.map((entry) => {
			return {
				"name": entry[0],
				"local": entry[1],
				"lat": entry[2],
				"lng": entry[3],
				"code": entry[4],
				"subcode": entry[5],
				"population": entry[6],
				"continent": entry[7]
			}
		});
	},
	getOverWithCutomKeys(population, keys) {
		let filtered = CITIES.filter((city) => city[6] >= population);
		return filtered.map((entry) => {
			let data = {};
			if (keys.includes("name")) {
				data.name = entry[0];
			}
			if (keys.includes("local")) {
				data.local = entry[1];
			}
			if (keys.includes("lat")) {
				data.lat = entry[2];
			}
			if (keys.includes("lng")) {
				data.lng = entry[3];
			}
			if (keys.includes("code")) {
				data.code = entry[4];
			}
			if (keys.includes("subcode")) {
				data.subcode = entry[5];
			}
			if (keys.includes("population")) {
				data.population = entry[6];
			}
			if (keys.includes("continent")) {
				data.continent = entry[6];
			}
			return data;
		});
	},
}

module.exports = NATC;

