
const keyTable = {
	// addresses
	address1: [
		"address1",
		"address-1",
		"billing-address1",
		"billtoaddress1",
	],
	address2: [
		"address2",
		"address-2",
		"billing-address2",
		"billtoaddress2",
	],
	city: [
		"billing-city",
		"billtocity",
		"city",
	],
	state: [
		"billing-state",
		"billtoprovince",
		"billtostate",
		"state",
	],
	zip: [
		"billing-postalcode",
		"billing-zip",
		"billtopostalcode",
		"billtozip",
		"postalcode",
		"postal-code",
		"zip",
		"zipcode",
		"zip-code"
	],
	country: [
		"billing-country",
		"billtocountry",
		"billtocountrycode",
		"country",
	],
	// identity
	firstname: [
		"billing-firstname",
		"billing-first-name",
		"billtofirstname",
		"firstname",
		"first-name",
	],
	lastname: [
		"billing-lastname",
		"billing-last-name",
		"billtolastname",
		"lastname",
		"last-name",
	],
	phone: [
		"billing-phone",
		"billing-phonenumber",
		"billing-phone-number",
		"billtophone",
		"phone",
		"phonenumber",
		"phone-number",
	],
	email: [
		"billtoemail",
		"email",
		"emailaddress",
		"email-address",
	],
	birthday: [
		"birthday",
		"dateofbirth",
		"date-of-birth",
		"dob",
	],
	age: [
		"age"
	],
	gender: [
		"gender",
	],
}

const fieldReferenceKeyMatch = (key) => {

	let hasMatch = false;

	// loop through references to find the field match
	Object.keys(keyTable).forEach((field, key) => {

		console.log("field", field, key);

	});

	if(!hasMatch) {

		console.log(`ERROR --- Field Matchup --- No field match found for key: "${key}"`);

		return null;
	}

	return key;
};

const fieldReferenceObject = (headers) => {

	let referenceObject = {
		unmatched: {},
		matched: {}
	};

	[...headers].forEach((header) => {

		if(keyTable.address1.includes(header) && !referenceObject.matched.address1) {
			referenceObject.matched.address1 = header;
		} else if(keyTable.address2.includes(header) && !referenceObject.matched.address2) {
			referenceObject.matched.address2 = header;
		} else if(keyTable.city.includes(header) && !referenceObject.matched.city) {
			referenceObject.matched.city = header;
		} else if(keyTable.state.includes(header) && !referenceObject.matched.state) {
			referenceObject.matched.state = header;
		} else if(keyTable.zip.includes(header) && !referenceObject.matched.zip) {
			referenceObject.matched.zip = header;
		} else if(keyTable.country.includes(header) && !referenceObject.matched.country) {
			referenceObject.matched.country = header;
		} else if(keyTable.firstname.includes(header) && !referenceObject.matched.firstname) {
			referenceObject.matched.firstname = header;
		} else if(keyTable.lastname.includes(header) && !referenceObject.matched.lastname) {
			referenceObject.matched.lastname = header;
		} else if(keyTable.phone.includes(header) && !referenceObject.matched.phone) {
			referenceObject.matched.phone = header;
		} else if(keyTable.email.includes(header) && !referenceObject.matched.email) {
			referenceObject.matched.email = header;
		} else if(keyTable.birthday.includes(header) && !referenceObject.matched.birthday) {
			referenceObject.matched.birthday = header;
		} else if(keyTable.age.includes(header) && !referenceObject.matched.age) {
			referenceObject.matched.age = header;
		} else if(keyTable.gender.includes(header) && !referenceObject.matched.gender) {
			referenceObject.matched.gender = header;
		} else {
			referenceObject.unmatched[header] = header;
		}
	});

	return referenceObject;
}

export { fieldReferenceKeyMatch, fieldReferenceObject };