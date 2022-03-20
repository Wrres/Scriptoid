console.log("TEST");

const HELPERS = require("./utils/Helpers");

const CITY = {
				"city": "Traralgon",
				"pop": 24605,
				"lat": -38.19528,
				"lon": 146.5415,
				"sub": "Victoria",
				"country": [
					"AU",
					"Australia"
				]
			};

async function testCityguessCity(){
	
	let city = HELPERS.cleanCityName(CITY.city);
	let citySub = `${city},_${CITY.sub}`;
	let cityCountry = `${city},_${CITY.country[1]}`;

	console.log(city);
	console.log(citySub);
	console.log(cityCountry);
	
	let imageData = await HELPERS.getImageFromPage(citySub) ||
					await HELPERS.getImageFromPage(cityCountry) ||
					await HELPERS.getImageFromPage(city);

	return imageData;
}

testCityguessCity()
.then((data) => {
	console.log(data);
})
.catch((error) => {
	console.log(error);
});


