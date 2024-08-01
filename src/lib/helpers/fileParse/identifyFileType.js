// Field references for identifying file type
const identityReference = {
	"timeseries-activity": [

	],
	"timeseries-contact": [

	],
	"timeseries-sales": [
		"paid-at",
		"purchase-complete",
		"purchased-at",
	],
};

const identifyFileType = (object) => {

	console.log("IDENTIFY", object);

	let match;

	// loop through references to find the field match
	Object.keys(identityReference).forEach((key) => {

		if(object.some((header) => identityReference[key].includes(header))) {
			match = key;
		}
	});

	console.log("MATCH", match);

	if(match) return match;

	return "default";
};

export default identifyFileType;