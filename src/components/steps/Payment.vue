<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>

			<form @submit.prevent="validateForm">
				<fieldset>
					<h3>Preencha os dados de pagamento</h3>
					<template v-if="!useRegisteredCard">
						<label for="name_on_card">Nome completo do titular do cartão</label>
						<input
							type="text"
							v-model="name_on_card"
							name="name_on_card">
						<label for="cpf">CPF do titular</label>
						<input
							type="text"
							v-model="cpf"
							name="cpf"
							v-mask="'###.###.###-##'">
						<label for="number">Número do cartão de crédito</label>
						<input
							type="text"
							v-model="number"
							name="number"
							placeholder="numero sem pontos"
							v-mask="'#### #### #### #### ####'">
						<label for="validity">Data expiração</label>
						<input
							type="text"
							v-model="validity"
							name="validity"
							placeholder="MM/AAAA"
							v-mask="'##/####'">
						<label for="csc">Cód. Segurança</label>
						<input
							type="text"
							v-model="csc"
							name="csc"
							maxlength="3">
					</template>

					<div v-if="user.credit_cards.length > 0">
						<h3>Utilizar um cartão já cadastrado</h3>
						<select name="credit_cards" id="credit_cards" v-model="selectedCard" @change="useCard">
							<option value="">Selecionar cartão</option>
							<option
								:value="card.id"
								v-for="card in user.credit_cards"
								:key="card.id">
								{{ niceType(card.brand) }} com final {{ endNumber(card.mask) }}
							</option>
						</select>
					</div>
				</fieldset>

				<fieldset>
					<h3>Dados de contato do titular</h3>
					<a href="#" @click.prevent="copyData">usar os dados já cadastrados</a>
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

				<button type="send" :disabled="loading">Finalizar</button>
			</form>
		</section>
		<aside>
			<div class="steps">
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span class="active">4</span>
				<span>5</span>
			</div>
			<hr>
			<h2>Informações de pagamento</h2>
			<p>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</p>
		</aside>
	</main>
</template>

<script>
import { mask } from 'vue-the-mask';
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

import { validate, getAddress } from '../../utilities';

export default {
	name: 'Payment',
	directives: {
		mask,
	},
	data() {
		return {
			loading: false,
			name_on_card: '',
			csc: '',
			number: '',
			validity: '',
			brand: '',
			cpf: '',
			cellphone_number: '',
			address_city: '',
			address_neighbourhood: '',
			address_number: '',
			address_state: '',
			address_street: '',
			address_observation: '',
			address_zip: '',
			selectedCard: '',
			useRegisteredCard: false,
		};
	},
	computed: {
		donation() {
			return this.$store.state.donation;
		},
		user() {
			return this.$store.state.user;
		},
		newCard() {
			return this.$store.state.newCard;
		},
	},
	methods: {
		validateForm() {
			this.toggleLoading();

			const {
				name_on_card,
				csc,
				number,
				validity,
				cpf,
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_observation,
				address_number,
				address_state,
				address_street,
				address_zip,
			} = this;

			const fieldsCard = {
				name_on_card,
				csc,
				number,
				validity,
				cpf,
			};

			const fieldsContact = {
				cellphone_number: this.cleanPhone(cellphone_number),
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip: this.cleanZip(address_zip),
			};

			const validationContact = validate(fieldsContact);
			let validationCard = { valid: true };

			if (!this.useRegisteredCard) {
				validationCard = validate(fieldsCard);
			}

			if (validationContact.valid && validationCard.valid) {
				fieldsContact.address_observation = address_observation;
				if (this.useRegisteredCard) {
					this.sendSubscription();
				} else {
					fieldsCard.brand = this.getBrand(number);

					this.saveCard({
						name_on_card,
						csc,
						number,
						validity: this.cleanValidity(validity),
					});
				}
			} else {
				console.error('formulario contem erros', validationContact, validationCard);
				this.toggleLoading();
			}
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
		getBrand(number) {
			const result = creditCardType(number);
			if (result.length < 1) {
				return 'No brand found';
			}

			return result[0].type.replace('-', '');
		},
		saveCard(card) {
			this.$store.dispatch('GET_FLOTUM')
				.then(() => {
					this.$store.dispatch('REGISTER_CARD', card)
						.then(() => {
							this.selectedCard = this.newCard.id;
							this.sendSubscription();
						});
				});
		},
		sendSubscription() {
			const data = {
				amount: this.donation.amount,
				credit_card_id: this.selectedCard,
				is_recurring: this.donation.is_recurring,
				merchant_program_id: this.donation.merchant_program_id,
			};
			this.$store.dispatch('SEND_SUBSCRIPTION', data)
				.then(() => {
					this.$router.push({ path: '/finish' });
				})
				.catch(err => console.error('deu ruim', err));
		},
		copyData() {
			const {
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_observation,
				address_number,
				address_state,
				address_street,
				address_zip,
			} = this.user;

			this.cellphone_number = cellphone_number.replace('+55', '');
			this.address_city = address_city;
			this.address_neighbourhood = address_neighbourhood;
			this.address_observation = address_observation;
			this.address_number = address_number;
			this.address_state = address_state;
			this.address_street = address_street;
			this.address_zip = address_zip;
		},
		endNumber(num) {
			return num.slice(num.length - 3, num.length);
		},
		niceType(type) {
			const types = creditCardType('');
			const nice = types.find(item => item.type.replace('-', '') === type);
			if (nice) {
				return nice.niceType;
			}
			return type;
		},
		useCard() {
			// eslint-disable-next-line
			this.useRegisteredCard = this.selectedCard !== '' ? true : false;
		},
		cleanPhone(phone) {
			return `+55${phone
				.trim()
				.replace(/\W+/g, '')
				.replace(/\D+/g, '')}`;
		},
		cleanZip(zip) {
			return zip.replace(/\D+/g, '');
		},
		cleanValidity(validity) {
			const valid = validity
				.replace(/\D+/g, '')
				.replace(/(\d{2})(\d{4})/g, '$2$1');
			return valid;
		},
		toggleLoading() {
			this.loading = !this.loading;
		},
	},
};
</script>
