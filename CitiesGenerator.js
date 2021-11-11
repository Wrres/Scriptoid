const FS = require("fs");
const CITIES = require("./newsets/cityguess.js");

const GROUPED = [];
const COUNT = [];

CITIES.sets.forEach((cityOriginal) => {
	let match = GROUPED.find((city) => city.country === cityOriginal.answers[0]);
	if(match){
		match.cities.push(cityOriginal.letter);
	}
	else{
		GROUPED.push(
			{
				"country": cityOriginal.answers[0],
				"name": cityOriginal.answers[1],
				"cities": [cityOriginal.letter]
			}
		);
	}

	let match2 = COUNT.find((city) => city.country === cityOriginal.answers[0]);
	if(match2){
		match2.cities++;
	}
	else{
		COUNT.push(
			{
				"country": cityOriginal.answers[0],
				"name": cityOriginal.answers[1],
				"cities": 1
			}
		);
	}
});

/**
 * Writes the file
 */
// FS.writeFile("cityguess.txt", JSON.stringify(GROUPED, null, "\t"), (error) => {
// 	if (error) throw err;
// 	console.log("Saved!");
// });

/**
 * Writes the file
 */
// FS.writeFile("cityguesscount.txt", JSON.stringify(COUNT, null, "\t"), (error) => {
// 	if (error) throw err;
// 	console.log("Saved!");
// });

/**
 * Writes the file
 */
// COUNT.sort((countryA, countryB) => {
// 	if(countryA.cities > countryB.cities){
// 		return 1;
// 	}
// 	else if(countryA.cities < countryB.cities){
// 		return -1;
// 	}
// 	else{
// 		return 0;
// 	}
// });
// FS.writeFile("cityguesscountsorted.txt", JSON.stringify(COUNT, null, "\t"), (error) => {
// 	if (error) throw err;
// 	console.log("Saved!");
// });
