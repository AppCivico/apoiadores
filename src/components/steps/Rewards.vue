<template>
	<main class="container">
		<section class="content">
			<h2>Compartilhe um sonho</h2>
			<form @submit.prevent="validateForm">
				<fieldset>
					<h3>Quanto pretende contribuir?</h3>

					<div class="input-wrapper">
						<input type="radio" id="amount1" name="amount" v-model="amount" value="2000">
						<label for="amount1" class="bigger">R$ 20,00</label>
						<div class="radio"></div>
					</div>

					<div class="input-wrapper">
						<input type="radio" id="amount2" name="amount" v-model="amount" value="4000">
						<label for="amount2" class="bigger">R$ 40,00</label>
						<div class="radio"></div>
					</div>

					<div class="input-wrapper">
						<input type="radio" id="amount3" name="amount" v-model="amount" value="8000">
						<label for="amount3" class="bigger">R$ 80,00</label>
						<div class="radio"></div>
					</div>

					<div class="input-wrapper">
						<input type="radio" id="amount4" name="amount" v-model="amount" value="20000">
						<label for="amount4" class="bigger">R$ 200,00</label>
						<div class="radio"></div>
					</div>

					<div class="input-wrapper">
						<input type="radio" id="amount5" name="amount" v-model="amount" value="other">
						<label for="amount5" class="bigger">Outro valor</label>
						<div class="radio"></div>
					</div>

					<div class="input-wrapper half has-real-value">
						<label for="other">R$</label>
						<input
							type="text"
							name="other"
							v-model="other"
							:disabled="amount === 'other' ? false : true"
							@keyup="formatOther">
						<div class="real-value">{{ formatedOther }}</div>
					</div>
				</fieldset>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" :disabled="loading">Quero doar</button>
			</form>
		</section>
		<aside>
			<div class="steps">
				<span class="active">1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
				<span>5</span>
			</div>
			<hr>
			<h2>Como funciona?</h2>
			<ul>
				<li>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</li>
				<li>Há três formas de fazer esta contribuição:
					cartão de crédito, boleto bancário e transferência bancária.</li>
				<li>Os desafios são grandes. Nossos sonhos são maiores.</li>
			</ul>
		</aside>
	</main>
</template>

<script>
import { validate, formatBRL } from '../../utilities';
import config from '../../config';

export default {
	name: 'Rewards',
	data() {
		return {
			errorMessage: '',
			loading: false,
			amount: '',
			other: '',
			formatedOther: '',
			name: config.name,
		};
	},
	computed: {
		logged() {
			return this.$store.state.logged;
		},
		selectedOption() {
			return this.$store.state.selectedOption.data;
		},
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
		validateForm() {
			this.toggleLoading();

			const { amount, other } = this;
			const values = amount === 'other' ? { amount, other } : { amount };
			const validation = validate(values);

			if (validation.valid) {
				this.saveStep(values);
			} else {
				this.toggleLoading();
				this.errorMessage = 'Todos os campos são obrigatórios';
			}
		},
		saveStep(values) {
			const data = {
				amount: values.amount !== 'other' ? values.amount : this.cleanOther(values.other),
				merchant_project_pledge_id: this.selectedOption.id,
			};

			this.$store.dispatch('CHANGE_DONATION', data)
				.then(() => {
					if (this.logged) {
						this.$router.push({ path: '/payment' });
					} else {
						this.$router.push({ path: '/is-registered' });
					}
				})
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro no registro da doação';
					this.toggleLoading();
				});
		},
		formatOther() {
			this.formatedOther = formatBRL(this.other);
		},
		cleanOther(value) {
			return value.replace(/\d{2}$/g, '00');
		},
	},
};
</script>
