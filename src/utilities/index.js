import axios from 'axios';

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

function getAddress(zip) {
	return new Promise((resolve) => {
		if (zip !== '') {
			axios.get(`https://api.postmon.com.br/v1/cep/${zip}`).then((response) => {
				resolve(response.data);
			}, (err) => {
				console.error(err);
			});
		}
	});
}

// eslint-disable-next-line
export { validate, getAddress };
