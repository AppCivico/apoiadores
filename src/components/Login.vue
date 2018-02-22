<template>
	<div>
		<h3>Login component</h3>
		<form @submit.prevent="validateForm">
			<label for="email">Email</label>
			<input type="email" v-model="email" name="email">
			<label for="password">Senha</label>
			<input type="password" v-model="password" name="password">
			<button type="submit">Entrar</button>
		</form>
	</div>
</template>

<script>
import { validate } from '../utilities';

export default {
	name: 'Login',
	props: {
		route: String,
	},
	data() {
		return {
			email: '',
			password: '',
		};
	},
	computed: {
		merchant() {
			return this.$store.state.merchant;
		},
	},
	methods: {
		validateForm() {
			const { email, password } = this;
			const fields = { email, password };
			const validation = validate(fields);

			if (validation.valid) {
				fields.merchant_id = this.merchant.id;
				this.login(fields);
			} else {
				console.error('formulario contem erros', validation.errors);
			}
		},
		login(data) {
			this.$store.dispatch('LOGIN', data)
				.then(() => {
					this.$router.push({ path: this.route });
				});
		},
	},
};
</script>
