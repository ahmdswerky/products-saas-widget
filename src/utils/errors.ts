export function handleErrors(errors, callback) {
	if (
		errors &&
		errors.response &&
		errors.response.status === 422 &&
		errors.response.data &&
		errors.response.data.errors &&
		Object.keys(errors.response.data.errors).length
	) {
		return callback(errors.response.data.errors);
	}

	return callback(errors);
}

export default {
	handleErrors,
};
