function validate(fields) {
	const keys = Object.keys(fields);
	const errors = [];
	let valid = true;

	// eslint-disable-next-line
	keys.map((item) => {
		if (fields[item] === '') {
			valid = false;
			errors.push({
				field: item,
				error: 'Campo obrigatório',
			});
		}
	});

	return { valid, errors };
}

// eslint-disable-next-line
export { validate };
