<template>
	<main class="container">
		<section class="content">
			<h2>Senha</h2>
			<h3>Nova senha</h3>

			<form @submit.prevent="editPassword">
				<div class="input-wrapper">
					<label for="password">Senha</label>
					<input
						type="password"
						name="password"
						ref="password"
						v-model="password">
				</div>
				<div class="input-wrapper">
					<label for="password_confirm">Confirmar senha</label>
					<input
						type="password"
						name="password_confirm"
						ref="password_confirm"
						v-model="password_confirm">
				</div>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" class="btn" :disabled="loading">Alterar senha</button>
			</form>
		</section>
		<aside>
			<img src="../../assets/img/donation/step_login.png" alt="Icon">
			<h2>Recuperação de senha</h2>
		</aside>
	</main>
</template>

<script>
/* eslint-disable camelcase */
export default {
	name: 'forgotPassword',
	data() {
		return {
			loading: false,
			password: '',
			password_confirm: '',
			errorMessage: '',
		};
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
		editPassword() {
			this.toggleLoading();
			const { password, password_confirm } = this;
			const fields = {
				password,
				password_confirm,
				secret_key: this.$route.query.key,
			};

			if (password === '' && password_confirm === '') {
				this.errorMessage = 'Favor, preencher todos os campos';
				this.toggleLoading();
				return;
			}

			if (password !== password_confirm) {
				this.errorMessage = 'Ops! As senhas devem ser iguais!';
				this.toggleLoading();
				return;
			}


			this.$store.dispatch('EDIT_PASSWORD', fields)
				.then(() => {
					this.errorMessage = 'Sua senha foi alterada com sucesso';
					this.password = '';
					this.password_confirm = '';
					this.toggleLoading();
				})
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro ao tentar alterar sua senha. Tente novamente!';
					this.toggleLoading();
				});
		},
	},
};
</script>
