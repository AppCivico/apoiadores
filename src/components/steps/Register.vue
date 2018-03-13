<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>

			<form @submit.prevent="validateForm">
				<fieldset>
					<h3>Dados pessoais</h3>
					<input
						type="text"
						name="first_name"
						v-model="first_name"
						placeholder="Name">
					<input
						type="text"
						name="last_name"
						v-model="last_name"
						placeholder="Surname">
					<input
						type="text"
						name="cpf"
						v-model="cpf"
						placeholder="CPF"
						v-mask="'###.###.###-##'">
					<input
						type="email"
						name="email"
						v-model="email"
						placeholder="Email">
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
					<h3>Dados de contato</h3>
					<input
						type="text"
						name="cellphone_number"
						v-model="cellphone_number"
						placeholder="Telefone"
						v-mask="['(##)####-####', '(##)#####-####']">
					<input
						type="text"
						name="address_zip"
						v-model="address_zip"
						placeholder="CEP"
						@blur="setAddress"
						v-mask="'#####-###'">
					<input
						type="text"
						name="address_street"
						v-model="address_street"
						placeholder="Endereço">
					<input
						type="text"
						name="address_number"
						v-model="address_number"
						placeholder="Número">
					<input
						type="text"
						name="address_observation"
						v-model="address_observation"
						placeholder="Complemento">
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

				<button type="submit" :disabled="loading">Continuar</button>
			</form>
		</section>
		<aside>
			<div class="steps">
				<span>1</span>
				<span>2</span>
				<span class="active">3</span>
				<span>4</span>
				<span>5</span>
			</div>
			<hr>
			<h2>Informações pessoais</h2>
			<p>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</p>
		</aside>
	</main>
</template>

<script>
/* eslint-disable camelcase */
import { mask } from 'vue-the-mask';
import { validate, getAddress } from '../../utilities';
import config from '../../config';

export default {
	name: 'Register',
	directives: {
		mask,
	},
	data() {
		return {
			loading: false,
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
			address_observation: '',
			address_zip: '',
			name: config.name,
		};
	},
	computed: {
		merchant() {
			return this.$store.state.merchant;
		},
	},
	methods: {
		changeType(event) {
			const ref = event.target.getAttribute('name');
			this.$refs[ref].setAttribute('type', 'password');
		},
		setAddress() {
			if (this.address_zip !== '') {
				getAddress(this.address_zip)
					.then((res) => {
						const { bairro, cidade, estado_info, logradouro } = res;
						this.address_neighbourhood = bairro;
						this.address_state = estado_info.nome;
						this.address_street = logradouro;
						this.address_city = cidade;
					});
			}
		},
		validateForm() {
			this.toggleLoading();

			const {
				first_name,
				last_name,
				cpf,
				email,
				password,
				password_confirm,
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_observation,
				address_zip,
			} = this;

			const fields = {
				first_name,
				last_name,
				cpf,
				email,
				password,
				password_confirm,
				cellphone_number: this.cleanPhone(cellphone_number),
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip: this.cleanZip(address_zip),
			};

			if (password_confirm !== password) {
				console.error('password nao é igual');
				this.toggleLoading();
				return;
			}

			const validation = validate(fields);

			if (validation.valid) {
				fields.address_observation = address_observation;
				fields.merchant_id = this.merchant.id;

				console.log('fields', fields);

				this.registerUser(fields);
			} else {
				console.error('formulario contem erros', validation.errors);
				this.toggleLoading();
			}
		},
		cleanPhone(phone) {
			return `+55${phone
				.trim()
				.replace(/\W+/g, '')
				.replace(/\D+/g, '')}`;
		},
		registerUser(data) {
			this.$store.dispatch('CREATE_USER', data)
				.then(() => {
					this.$router.push({ path: '/payment' });
				});
		},
		cleanZip(zip) {
			return zip.replace(/\D+/g, '');
		},
		toggleLoading() {
			this.loading = !this.loading;
		},
	},
};
</script>
