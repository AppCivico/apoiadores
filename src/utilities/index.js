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
	return new Promise((resolve, reject) => {
		if (zip !== '') {
			axios.get(`https://api.postmon.com.br/v1/cep/${zip}`).then((response) => {
				resolve(response.data);
			}, (err) => {
				reject(err);
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

function formatDate(data) {
	const week = [
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
		'Domingo',
	];
	const months = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];
	const date = new Date(data);

	const weekDay = week[date.getDay()];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	const time = data
		.split('T')[1]
		.replace(':', 'h')
		.split(':')[0];

	return `${weekDay}, ${day} de ${month} de ${year} - ${time}`;
}

function removeAccented(value) {
	let newString = value.toLowerCase();
	const mapaAcentosHex = {
		a: /[\xE0-\xE6]/g,
		e: /[\xE8-\xEB]/g,
		i: /[\xEC-\xEF]/g,
		o: /[\xF2-\xF6]/g,
		u: /[\xF9-\xFC]/g,
		c: /\xE7/g,
		n: /\xF1/g,
	};
	const keys = Object.keys(mapaAcentosHex);

	keys.map((item) => {
		const expressaoRegular = mapaAcentosHex[item];
		newString = newString.replace(expressaoRegular, item);
	});

	return newString;
}

// eslint-disable-next-line
export { validate, getAddress, formatBRL, cleanPhone, formatDate, removeAccented };
