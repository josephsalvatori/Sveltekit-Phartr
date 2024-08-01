export const handleError = ({ error }) => {

	const errorId = crypto.randomUUID();

	console.error(error);

	return {
		message: "An unexpected error occured.",
		errorId
	};
};