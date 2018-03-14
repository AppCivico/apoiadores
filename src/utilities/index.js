import axios from 'axios';

function validate(fields) {
	const keys = Object.keys(fields);
	const errors = {};
	let valid = true;

	// eslint-disable-next-line
	keys.map((item) => {
		if (fields[item] === '') {
			valid = false;
			errors[item] = 'Campo obrigatório';
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

function formatBRL(amount) {
	let formated = `${amount}`;
	formated = formated.replace(/([0-9]{2})$/g, ',$1');

	if (formated.length > 6) {
		formated = formated.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
	}

	return formated;
}

function cleanPhone(phone) {
	return `+55${phone
		.trim()
		.replace(/\W+/g, '')
		.replace(/\D+/g, '')}`;
}

// eslint-disable-next-line
export { validate, getAddress, formatBRL, cleanPhone };
