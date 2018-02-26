<template>
	<div>
		<h3>Login component</h3>
		<form @submit.prevent="validateForm">
			<label for="email">Email</label>
			<input type="email" v-model.trim="email" name="email">
			<label for="password">Senha</label>
			<input type="password" v-model.trim="password" name="password">
			<button type="submit" :disabled="loading">Entrar</button>
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
			loading: false,
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
		toggleLoading() {
			this.loading = !this.loading;
		},
		validateForm() {
			this.toggleLoading();
			const { email, password } = this;
			const fields = { email, password };
			const validation = validate(fields);

			if (validation.valid) {
				fields.merchant_id = this.merchant.id;
				this.login(fields);
			} else {
				this.toggleLoading();
				console.error('formulario contem erros', validation.errors);
			}
		},
		login(data) {
			this.$store.dispatch('LOGIN', data)
				.then(() => {
					this.$router.push({ path: this.route });
				})
				.catch((err) => {
					console.err('Erro no login', err);
					this.toggleLoading();
				});
		},
	},
};
</script>
