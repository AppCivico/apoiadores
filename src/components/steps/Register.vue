<template>
	<div>
		<h1>Register</h1>

		<form @submit.prevent="validateForm">
			<fieldset>
				<h2>Dados pessoais</h2>
				<input type="text" name="first_name" v-model="first_name" placeholder="Name">
				<input type="text" name="last_name" v-model="last_name" placeholder="Surname">
				<input type="text" name="cpf" v-model="cpf" placeholder="CPF">
				<input type="email" name="email" v-model="email" placeholder="Email">
				<input
					type="text"
					name="password"
					ref="password"
					v-model="password"
					placeholder="Senha"
					@focus="changeType">
				<input
					type="text"
					name="password_confirm"
					ref="password_confirm"
					v-model="password_confirm"
					placeholder="Confirmar senha"
					@focus="changeType">
			</fieldset>

			<fieldset>
				<h2>Dados de contato</h2>
				<input
					type="text"
					name="cellphone_number"
					v-model="cellphone_number"
					placeholder="Telefone">
				<input
					type="text"
					name="address_zip"
					v-model="address_zip"
					placeholder="CEP"
					@blur="getAddress">
				<input type="text" name="address_street" v-model="address_street" placeholder="Endereço">
				<input type="text" name="address_number" v-model="address_number" placeholder="Número">
				<input type="text" name="address_comp" v-model="address_comp" placeholder="Complemento">
				<input
					type="text"
					name="address_neighbourhood"
					v-model="address_neighbourhood"
					placeholder="Bairro"
					disabled>
				<input
					type="text"
					name="address_state"
					v-model="address_state"
					placeholder="Estado"
					disabled>
				<input
					type="text"
					name="address_city"
					v-model="address_city"
					placeholder="Estado"
					disabled>
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
