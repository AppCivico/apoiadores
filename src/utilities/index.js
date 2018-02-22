function validate(fields) {
	const keys = Object.keys(fields);

	// eslint-disable-next-line
	const errors = keys.map((item) => {
		if (fields[item] === '') {
			return {
				field: item,
				error: 'Campo obrigatório',
			};
		}
	});

	return errors;
}

// eslint-disable-next-line
export { validate };
