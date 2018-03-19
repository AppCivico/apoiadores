<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>
			<h3>Valor e periodicidade escolhidos</h3>
			<blockquote>
				R$ {{ donation.amount | formatBRL }}
				•
				{{ donation.is_recurring ? 'Mensal' : 'Única vez' }}
			</blockquote>
			<form @submit.prevent="validateForm">
				<fieldset>
					<template v-if="!useRegisteredCard">
						<h3>Preencha os dados de pagamento</h3>
						<div :class="`input-wrapper
						${validationCard.errors.name_on_card ? 'has-error' : ''}`">
							<label for="name_on_card">Nome completo do titular do cartão</label>
							<input
								type="text"
								v-model="name_on_card"
								name="name_on_card"
								maxlength="26">
							<div class="error" v-if="validationCard.errors.name_on_card">
								{{ validationCard.errors.name_on_card }}
							</div>
						</div>
						<div :class="`input-wrapper
						${validationCard.errors.cpf ? 'has-error' : ''}`">
							<label for="cpf">CPF do titular</label>
							<input
								type="text"
								v-model="cpf"
								name="cpf"
								v-mask="'###.###.###-##'">
							<div class="error" v-if="validationCard.errors.cpf">
								{{ validationCard.errors.cpf }}
							</div>
						</div>
						<div :class="`input-wrapper
						${validationCard.errors.number ? 'has-error' : ''}`">
							<label for="number">Número do cartão de crédito</label>
							<input
								type="text"
								v-model="number"
								name="number"
								v-mask="'#### #### #### #### ####'">
							<div class="error" v-if="validationCard.errors.number">
								{{ validationCard.errors.number }}
							</div>
						</div>
						<div :class="`input-wrapper
						${validationCard.errors.validity ? 'has-error' : ''}`">
							<label for="validity">Data expiração</label>
							<input
								type="text"
								v-model="validity"
								name="validity"
								placeholder="MM/AAAA"
								v-mask="'##/####'">
							<div class="error" v-if="validationCard.errors.validity">
								{{ validationCard.errors.validity }}
							</div>
						</div>
						<div :class="`input-wrapper
						${validationCard.errors.csc ? 'has-error' : ''}`">
							<label for="csc">Cód. Segurança</label>
							<input
								type="text"
								v-model="csc"
								name="csc"
								maxlength="3">
							<div class="error" v-if="validationCard.errors.csc">
								{{ validationCard.errors.csc }}
							</div>
						</div>
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
					<p><a href="#" @click.prevent="copyData">usar os dados já cadastrados</a></p>
					<div
						:class="`input-wrapper
						${validationContact.errors.cellphone_number ? 'has-error' : ''}`"
					>
						<label for="cellphone_number">Telefone</label>
						<input
							type="text"
							name="cellphone_number"
							v-model="cellphone_number"
							placeholder="Telefone"
							v-mask="['(##)####-####', '(##)#####-####']">
						<div class="error" v-if="validationContact.errors.cellphone_number">
							{{ validationContact.errors.cellphone_number }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validationContact.errors.address_zip ? 'has-error' : ''}`"
					>
						<label for="address_zip">CEP</label>
						<input
							type="text"
							name="address_zip"
							v-model="address_zip"
							placeholder="CEP"
							@blur="setAddress"
							v-mask="'#####-###'">
						<div class="error" v-if="validationContact.errors.address_zip">
							{{ validationContact.errors.address_zip }}
						</div>
					</div>
					<p>
						<a
							href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
							target="_blank">
							Não sei meu CEP
						</a>
					</p>
					<div
						:class="`input-wrapper
						${validationContact.errors.address_street ? 'has-error' : ''}`"
					>
						<label for="address_street">Endereço</label>
						<input
							type="text"
							name="address_street"
							v-model="address_street"
							placeholder="Endereço">
						<div class="error" v-if="validationContact.errors.address_street">
							{{ validationContact.errors.address_street }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validationContact.errors.address_number ? 'has-error' : ''}`"
					>
						<label for="address_number">Número</label>
						<input
							type="text"
							name="address_number"
							v-model="address_number"
							placeholder="Número">
						<div class="error" v-if="validationContact.errors.address_number">
							{{ validationContact.errors.address_number }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validationContact.errors.address_observation ? 'has-error' : ''}`"
					>
						<label for="address_observation">Complemento</label>
						<input
							type="text"
							name="address_observation"
							v-model="address_observation"
							placeholder="Complemento">
						<div class="error" v-if="validationContact.errors.address_observation">
							{{ validationContact.errors.address_observation }}
						</div>
					</div>
					<div
						:class="`input-wrapper
						${validationContact.errors.address_neighbourhood ? 'has-error' : ''}`"
					>
						<label for="address_neighbourhood">Bairro</label>
						<input
							type="text"
							name="address_neighbourhood"
							v-model="address_neighbourhood"
							placeholder="Bairro"
							disabled>
						<div class="error" v-if="validationContact.errors.address_neighbourhood">
							{{ validationContact.errors.address_neighbourhood }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validationContact.errors.address_city ? 'has-error' : ''}`"
					>
						<label for="address_city">Cidade</label>
						<input
							type="text"
							name="address_city"
							v-model="address_city"
							placeholder="Cidade"
							disabled>
						<div class="error" v-if="validationContact.errors.address_city">
							{{ validationContact.errors.address_city }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validationContact.errors.address_state ? 'has-error' : ''}`"
					>
						<label for="address_state">Estado</label>
						<input
							type="text"
							name="address_state"
							v-model="address_state"
							placeholder="Estado"
							disabled>
						<div class="error" v-if="validationContact.errors.address_state">
							{{ validationContact.errors.address_state }}
						</div>
					</div>
				</fieldset>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" :disabled="loading">Finalizar</button>
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
			<img src="../../assets/img/donation/step_payment.png" alt="Icon">
			<h2>Informações de pagamento</h2>
			<p>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</p>
		</aside>
	</main>
</template>

<script>
import { mask } from 'vue-the-mask';
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

import { validate, getAddress, cleanPhone, removeAccented } from '../../utilities';
import config from '../../config';

export default {
	name: 'Payment',
	directives: {
		mask,
	},
	data() {
		return {
			errorMessage: '',
			name: config.name,
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
			validationCard: {
				errors: {},
			},
			validationContact: {
				errors: {},
			},
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
				cellphone_number: this.getCleanPhone(cellphone_number),
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip: this.cleanZip(address_zip),
			};

			const validationContact = validate(fieldsContact);
			let validationCard = { valid: true };

			if (fieldsCard.validity.length < 6) {
				this.validationCard = {
					errors: {
						validity: 'Formato de validade do cartão incorreto. Utilize MM/AAAA',
					},
				};
				this.toggleLoading();
				return;
			}

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
						name_on_card: removeAccented(name_on_card),
						csc,
						number: number.replace(/\s+/g, ''),
						validity: this.cleanValidity(validity),
					});
				}
			} else {
				this.validationCard = validationCard;
				this.validationContact = validationContact;
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
					})
					.catch(() => {
						this.validation = {
							errors: {
								address_zip: 'O CEP informado não foi localizado.',
							},
						};
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
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro durante o cadastro da operação. Tente novamente!';
					this.toggleLoading();
				});
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
		getCleanPhone(phone) {
			return cleanPhone(phone);
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
