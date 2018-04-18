<template>
	<main class="container theme_project">
		<section class="content">
			<h2>Compartilhe um sonho</h2>
			<form @submit.prevent="validateForm">
				<fieldset>
					<h3>Quanto pretende contribuir?</h3>

					<div class="input-wrapper" v-for="pledge in selectedOption.pledges" :key="pledge.id">
						<input type="radio" :id="`amount${pledge.id}`" name="amount" v-model="amount" :value="pledge.amount ? pledge.amount : 'other'">
						<label :for="`amount${pledge.id}`" class="bigger" v-if="pledge.amount">R$ {{ pledge.amount | formatBRL}}</label>
						<label :for="`amount${pledge.id}`" class="bigger" v-else>Outro valor</label>
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
			let selectedPlegde = '';
			if (values.amount !== 'other') {
				selectedPlegde = this.selectedOption.pledges.find(el => el.amount === values.amount);
			} else {
				selectedPlegde = this.selectedOption.pledges.find(el => el.amount === null);
			}
			const data = {
				amount: values.amount !== 'other' ? values.amount : this.cleanOther(values.other),
				is_recurring: 0,
				merchant_project_id: selectedPlegde.id,
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
