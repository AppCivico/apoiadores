<template>
	<main class="container">
		<section class="content">
			<h2>Senha</h2>
			<h3>Esqueci minha senha</h3>

			<form @submit.prevent="sendToken">
				<div class="input-wrapper">
					<label for="cpf">Email</label>
					<input
						type="email"
						name="email"
						v-model="email">
				</div>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" class="btn" :disabled="loading">Recuperar senha</button>
			</form>
		</section>
		<aside>
			<img src="../../assets/img/donation/step_login.png" alt="Icon">
			<h2>Recuperação de senha</h2>
		</aside>
	</main>
</template>

<script>
export default {
	name: 'forgotPassword',
	data() {
		return {
			loading: false,
			email: '',
			errorMessage: '',
		};
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
		sendToken() {
			this.toggleLoading();
			const { email } = this;

			if (email === '') {
				this.errorMessage = 'Favor, preencher o seu e-mail.';
				this.toggleLoading();
				return;
			}

			this.$store.dispatch('SEND_TOKEN', { email })
				.then(() => {
					this.errorMessage = `Um e-mail com instruções foi enviado para o endereço ${email}`;
					this.toggleLoading();
				})
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro ao tentar recuperar sua senha. Tente novamente!';
					this.toggleLoading();
				});
		},
	},
};
</script>
