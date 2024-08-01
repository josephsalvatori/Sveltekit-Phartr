import Papa from "papaparse";
import { slugifyString } from "../string";

// parse CSV from string using papaparse and return structured object of headers and data;
const parseCSVString = async (string) => {

	let headers = [];
	let data = [];
	let errors = [];

	let fileData = Papa.parse(string, {
		header: true,
		// dynamicTyping: true,
		skipEmptyLines: true,
		transformHeader: (header) => {

			header = slugifyString(header);

			return header;
		}
	});

	if(fileData.errors.length > 0) {
		errors.push(fileData.errors);
	}

	headers = fileData.meta?.fields;
	data = fileData.data;

	return {
		headers,
		data,
		errors
	};
}

export default parseCSVString;