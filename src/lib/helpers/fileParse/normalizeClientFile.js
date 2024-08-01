import { fieldReferenceObject } from "./fieldReferenceKeyMatch";
import identifyFileType from "./identifyFileType"

const normalizeClientFile = (object) => {

	let normalizedObject = {
		type: identifyFileType(object.headers),
		data: []
	};

	let t1 = performance.now();
	let headerReference = fieldReferenceObject(object.headers);

	console.log("Headers Reference runtime:", performance.now() - t1, "milliseconds");

	normalizedObject.headers = headerReference;

	let t2 = performance.now();
	// loop through data object for matchups on specific key/values
	[...object.data].forEach((row) => {

		let upload = {};

		// find the person
		upload.firstname = (row[headerReference.matched?.firstname] || null);
		upload.lastname = (row[headerReference.matched?.lastname] || null);
		upload.email = (row[headerReference.matched?.email] || null);
		upload.phone = (row[headerReference.matched?.phone] || null);
		upload.birthday = (row[headerReference.matched?.birthday] || null);
		upload.gender = (row[headerReference.matched?.gender] || null);

		// find the location
		upload.address1 = (row[headerReference.matched?.address1] || null);
		upload.address2 = (row[headerReference.matched?.address2] || null);
		upload.city = (row[headerReference.matched?.city] || null);
		upload.state = (row[headerReference.matched?.state] || null);
		upload.zip = (row[headerReference.matched?.zip] || null);
		upload.country = (row[headerReference.matched?.country] || null);

		// hash key for uniqueness
		upload.hash = Buffer.from(`${upload.lastname}|${upload.address1}|${upload.zip}`).toString("base64");

		if(Object.keys(headerReference.unmatched).length > 0) {

			upload.custom = {};

			// merge all unmatched fields into a single object
			Object.keys(headerReference.unmatched).forEach((key) => {

				if(row[headerReference.unmatched[key]]) upload.custom[key] = row[headerReference.unmatched[key]];
			});
		}

		normalizedObject.data.push(upload);
	});

	console.log("Normalization runtime:", performance.now() - t2, "milliseconds");

	return normalizedObject;
};

const mergeClientData = (db, data) => {

	console.log("db", db);
	console.log("data", data);

	let mergeResults = new Set(...db, ...data);



	return mergeResults;
};

export { normalizeClientFile, mergeClientData };