<template>
	<div
		:class="`modal ${ this.isOpen ? 'active' : ''}`"
		@click.self="closeModal"
	>
		<div class="modal__content">
			<h3>
				Adicionar novo cartão de crédito
			</h3>

			<form @submit.prevent="getCardFields">
				<div :class="`input-wrapper ${validation.errors.name_on_card ? 'has-error' : ''}`">
					<label for="name_on_card">Nome completo do titular do cartão</label>
					<input
						type="text"
						v-model="name_on_card"
						name="name_on_card">
					<div class="error" v-if="validation.errors.name_on_card">
						{{ validation.errors.name_on_card }}
					</div>
				</div>
				<div :class="`input-wrapper ${validation.errors.cpf ? 'has-error' : ''}`">
					<label for="cpf">CPF do titular</label>
					<input
						type="text"
						v-model="cpf"
						name="cpf"
						v-mask="'###.###.###-##'">
					<div class="error" v-if="validation.errors.cpf">
						{{ validation.errors.cpf }}
					</div>
				</div>
				<div :class="`input-wrapper ${validation.errors.number ? 'has-error' : ''}`">
					<label for="number">Número do cartão de crédito</label>
					<input
						type="text"
						v-model="number"
						name="number"
						v-mask="'#### #### #### #### ####'">
					<div class="error" v-if="validation.errors.number">
						{{ validation.errors.number }}
					</div>
				</div>
				<div :class="`input-wrapper ${validation.errors.validity ? 'has-error' : ''}`">
					<label for="validity">Data expiração</label>
					<input
						type="text"
						v-model="validity"
						name="validity"
						placeholder="MM/AAAA"
						v-mask="'##/####'">
					<div class="error" v-if="validation.errors.validity">
						{{ validation.errors.validity }}
					</div>
				</div>
				<div :class="`input-wrapper ${validation.errors.csc ? 'has-error' : ''}`">
					<label for="csc">Cód. Segurança</label>
					<input
						type="text"
						v-model="csc"
						name="csc"
						maxlength="3">
					<div class="error" v-if="validation.errors.csc">
						{{ validation.errors.csc }}
					</div>
				</div>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" class="btn" :disabled="loading">Adicionar</button>
			</form>
		</div>
	</div>
</template>

<script>
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';
import { mask } from 'vue-the-mask';
import { validate } from '../../utilities';

export default {
	name: 'addCard',
	props: {
		activeCard: Boolean,
	},
	directives: {
		mask,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		isOpen() {
			return this.activeCard;
		},
	},
	mounted() {
		this.populateFields();
	},
	data() {
		return {
			loading: false,
			cpf: '',
			name_on_card: '',
			csc: '',
			number: '',
			validity: '',
			brand: '',
			validation: {
				errors: {},
			},
			errorMessage: '',
		};
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
		populateFields() {
			const {
				cpf,
			} = this.user;

			this.cpf = cpf;
		},
		getCardFields() {
			this.toggleLoading();

			const {
				name_on_card,
				csc,
				number,
				validity,
			} = this;

			const fields = {
				name_on_card,
				csc,
				number,
				validity,
			};

			const validation = validate(fields);
			if (validation.valid) {
				fields.brand = this.getBrand(number);

				this.saveCard({
					name_on_card,
					csc,
					number,
					validity: this.cleanValidity(validity),
				});
			} else {
				this.validation = validation;
				this.toggleLoading();
			}
		},
		validateForm(fields) {
			const validation = validate(fields);
			if (validation.valid) {
				this.editUser(fields);
			} else {
				this.validation = validation;
				this.toggleLoading();
			}
		},
		saveCard(card) {
			this.$store.dispatch('GET_FLOTUM')
				.then(() => {
					this.$store.dispatch('REGISTER_CARD', card)
						.then(() => {
							this.$store.dispatch('LOAD_USER')
								.then(() => {
									this.toggleLoading();
									this.closeModal();
								});
						})
						.catch(() => {
							this.errorMessage = 'Ocorreu um erro ao salvar seu cartão';
							this.toggleLoading();
						});
				})
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro ao processar seu cartão';
					this.toggleLoading();
				});
		},
		closeModal() {
			this.$emit('close', true);
		},
		cleanValidity(validity) {
			const valid = validity
				.replace(/\D+/g, '')
				.replace(/(\d{2})(\d{4})/g, '$2$1');
			return valid;
		},
		getBrand(number) {
			const result = creditCardType(number);
			if (result.length < 1) {
				return 'No brand found';
			}

			return result[0].type.replace('-', '');
		},
	},
};
</script>
