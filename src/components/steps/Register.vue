<template>
	<div>
		<h1>Register</h1>

		<form @submit.prevent="validateForm">
			<fieldset>
				<h2>Dados pessoais</h2>
				<input type="text" name="name" v-model="name" placeholder="Name">
				<input type="text" name="surname" v-model="surname" placeholder="Surname">
				<input type="text" name="surname" v-model="cpf" placeholder="CPF">
				<input type="email" name="surname" v-model="email" placeholder="Email">
				<input type="text" name="surname" v-model="password" placeholder="Senha" @focus="changeType">
				<input type="text" name="surname" v-model="confirmPassword" placeholder="Confirmar senha">
			</fieldset>

			<button type="submit">Continuar</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line
import { validate } from '../../utilities';

export default {
	name: 'Register',
	data() {
		return {
			first_name: '',
			last_name: '',
			cpf: '',
			email: '',
			password: '',
			password_confirm: '',
			cellphone_number: '',
			address_city: '',
			address_neighbourhood: '',
			address_number: '',
			address_state: '',
			address_street: '',
			address_comp: '',
			address_zip: '',
		};
	},
	methods: {
		changeType(event) {
			const ref = event.target.getAttribute('name');
			this.$refs[ref].setAttribute('type', 'password');
		},
		getAddress() {
			if (this.address_zip !== '') {
				axios.get(`https://api.postmon.com.br/v1/cep/${this.address_zip}`).then((response) => {
					// eslint-disable-next-line camelcase
					const { bairro, cidade, estado_info, logradouro } = response.data;
					this.address_neighbourhood = bairro;
					this.address_state = estado_info.nome;
					this.address_street = logradouro;
					this.address_city = cidade;
				}, (err) => {
					console.error(err);
				});
			}
		},
		validateForm() {
			console.log('foi');

			/* const validation = validate(values);

			if (validation.valid) {
				this.saveStep(values);
			} else {
				console.error('formulario contem erros', validation.errors);
			} */
		},
	},
};
</script>
