<template>
	<div class="login">
		<form @submit.prevent="validateForm">
			<label for="email" class="visually-hidden">Email</label>
			<input
				type="email"
				v-model.trim="email"
				name="email"
				placeholder="Email"
			>
			<label for="password" class="visually-hidden">Senha</label>
			<input
				type="password"
				v-model.trim="password"
				name="password"
				placeholder="Senha"
			>

			<div class="login__options">
				<div class="input-wrapper">
					<input
						type="checkbox"
						name="connected"
						v-model="connected"
					>
					<label for="connected" class="smaller">Continuar conectado</label>
					<div class="checkbox"></div>
				</div>
				<router-link to="/my-account/password">Esqueci minha senha</router-link>
			</div>
			<p class="error" v-if="errorMessage != ''">
				{{ errorMessage }}
			</p>
			<button type="submit" :disabled="loading">Entrar</button>
			<p class="login__disclaimer">Ao entrar, você concorda com nossos termos de uso,
				condições, política de privacidade e que tem pelo menos 18 anos de idade</p>
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
			errorMessage: '',
			loading: false,
			email: '',
			password: '',
			connected: false,
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
				this.errorMessage = 'Todos os campos são obrigatórios';
			}
		},
		login(data) {
			this.$store.dispatch('LOGIN', data)
				.then(() => {
					this.toggleLoading();
					this.$router.push({ path: this.route });
				})
				.catch(() => {
					this.errorMessage = 'Email ou senha incorretos. Tenta novamente.';
					this.toggleLoading();
				});
		},
	},
};
</script>
