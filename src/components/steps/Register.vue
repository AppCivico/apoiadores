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
// eslint-disable-next-line
import { validate } from '../../utilities';

export default {
	name: 'Register',
	data() {
		return {
			name: '',
			surname: '',
			cpf: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	},
	methods: {
		changeType() {
			this.type = 'password';
			console.log(this);
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
