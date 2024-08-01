export const slugifyString = (string) => {

	// remove whitespace, remove special characters, replace spaces with dashes, remove duplicate dashes, convert to lowercase
	return string.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/-+/g, "-").toLowerCase();
};