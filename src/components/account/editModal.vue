<template>
	<div
		:class="`modal ${ this.isOpen ? 'active' : ''}`"
		@click.self="closeModal"
	>
		<div class="modal__content">
			<h3>Altere os dados de
				{{ this.type === 'contact' ? 'contato' : 'acesso' }}
			</h3>

			<form @submit.prevent="getAccessFields" v-if="this.type === 'access'">
				<div
					:class="`input-wrapper ${validation.errors.cpf ? 'has-error' : ''}`"
				>
					<label for="cpf">CPF</label>
					<input
						type="text"
						name="cpf"
						v-model="cpf"
						v-mask="'###.###.###-##'">
					<div class="error" v-if="validation.errors.cpf">
						{{ validation.errors.cpf }}
					</div>
				</div>
				<div
					:class="`input-wrapper ${validation.errors.email ? 'has-error' : ''}`"
				>
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						v-model="email">
					<div class="error" v-if="validation.errors.email">
						{{ validation.errors.email }}
					</div>
				</div>
				<div
					:class="`input-wrapper ${validation.errors.password ? 'has-error' : ''}`"
				>
					<label for="password">Senha</label>
					<input
						type="password"
						name="password"
						ref="password"
						v-model="password"
						@change="editedPassword()">
					<div class="error" v-if="validation.errors.password">
						{{ validation.errors.password }}
					</div>
				</div>
				<div
					:class="`input-wrapper ${validation.errors.password_confirm ? 'has-error' : ''}`"
				>
					<label for="password_confirm">Confirmar senha</label>
					<input
						type="password"
						name="password_confirm"
						ref="password_confirm"
						v-model="password_confirm"
						@change="editedPassword()">
					<div class="error" v-if="validation.errors.password_confirm">
						{{ validation.errors.password_confirm }}
					</div>
				</div>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" class="btn" :disabled="loading">Alterar</button>
			</form>

			<form @submit.prevent="getContactFields" v-if="this.type === 'contact'">
				<div
					:class="`input-wrapper ${validation.errors.cellphone_number ? 'has-error' : ''}`"
				>
					<label for="cellphone_number">Telefone</label>
					<input
						type="text"
						name="cellphone_number"
						v-model="cellphone_number"
						v-mask="['(##)####-####', '(##)#####-####']">
					<div class="error" v-if="validation.errors.cellphone_number">
						{{ validation.errors.cellphone_number }}
					</div>
				</div>
				<div
					:class="`input-wrapper half ${validation.errors.address_zip ? 'has-error' : ''}`"
				>
					<label for="address_zip">CEP</label>
					<input
						type="text"
						name="address_zip"
						v-model="address_zip"
						@blur="setAddress"
						v-mask="'#####-###'">
					<div class="error" v-if="validation.errors.address_zip">
						{{ validation.errors.address_zip }}
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
					:class="`input-wrapper ${validation.errors.address_street ? 'has-error' : ''}`"
				>
					<label for="address_street">Endereço</label>
					<input
						type="text"
						name="address_street"
						v-model="address_street">
					<div class="error" v-if="validation.errors.address_street">
						{{ validation.errors.address_street }}
					</div>
				</div>
				<div
					:class="`input-wrapper half ${validation.errors.address_number ? 'has-error' : ''}`"
				>
					<label for="address_number">Número</label>
					<input
						type="text"
						name="address_number"
						v-model="address_number">
					<div class="error" v-if="validation.errors.address_number">
						{{ validation.errors.address_number }}
					</div>
				</div>
				<div
					:class="`input-wrapper half ${validation.errors.address_observation ? 'has-error' : ''}`"
				>
					<label for="address_observation">Complemento</label>
					<input
						type="text"
						name="address_observation"
						v-model="address_observation">
					<div class="error" v-if="validation.errors.address_observation">
						{{ validation.errors.address_observation }}
					</div>
				</div>
				<div
					:class="`input-wrapper ${validation.errors.address_neighbourhood ? 'has-error' : ''}`"
				>
					<label for="address_neighbourhood">Bairro</label>
					<input
						type="text"
						name="address_neighbourhood"
						v-model="address_neighbourhood"
						disabled>
					<div class="error" v-if="validation.errors.address_neighbourhood">
						{{ validation.errors.address_neighbourhood }}
					</div>
				</div>
				<div
					:class="`input-wrapper half ${validation.errors.address_city ? 'has-error' : ''}`"
				>
					<label for="address_city">Cidade</label>
					<input
						type="text"
						name="address_city"
						v-model="address_city"
						disabled>
					<div class="error" v-if="validation.errors.address_city">
						{{ validation.errors.address_city }}
					</div>
				</div>
				<div
					:class="`input-wrapper half ${validation.errors.address_state ? 'has-error' : ''}`"
				>
					<label for="address_state">Estado</label>
					<input
						type="text"
						name="address_state"
						v-model="address_state"
						disabled>
					<div class="error" v-if="validation.errors.address_state">
						{{ validation.errors.address_state }}
					</div>
				</div>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" class="btn" :disabled="loading">Alterar</button>
			</form>
		</div>
	</div>
</template>

<script>
/* eslint-disable camelcase */
import { mask } from 'vue-the-mask';
import { validate, getAddress, cleanPhone } from '../../utilities';

export default {
	name: 'editModal',
	props: {
		type: String,
		active: Boolean,
	},
	directives: {
		mask,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		isOpen() {
			return this.active;
		},
	},
	mounted() {
		this.populateFields();
	},
	data() {
		return {
			loading: false,
			editPassword: false,
			cpf: '',
			email: '',
			password: '',
			password_confirm: '',
			cellphone_number: '',
			address_city: '',
			address_neighbourhood: '',
			address_number: '',
			address_state: '',
			address_street: '',
			address_observation: '',
			address_zip: '',
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
		editedPassword() {
			this.editPassword = true;
		},
		populateFields() {
			const {
				cpf,
				email,
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_observation,
				address_zip,
			} = this.user;

			this.cpf = cpf;
			this.email = email;
			this.cellphone_number = cellphone_number.replace('+55', '');
			this.address_city = address_city;
			this.address_neighbourhood = address_neighbourhood;
			this.address_number = address_number;
			this.address_state = address_state;
			this.address_street = address_street;
			this.address_observation = address_observation;
			this.address_zip = address_zip;
		},
		getAccessFields() {
			this.toggleLoading();

			let fields = {};
			const {
				cpf,
				email,
				password,
				password_confirm,
			} = this;

			if (this.editPassword) {
				fields = {
					cpf,
					email,
					password,
					password_confirm,
				};
			} else {
				fields = {
					cpf,
					email,
				};
			}

			if (password_confirm !== password) {
				this.validation = {
					errors: {
						password_confirm: 'Ops! Senha não corresponde ao campo acima.',
					},
				};
				this.toggleLoading();
				return;
			}

			const validation = validate(fields);
			if (validation.valid) {
				this.editUser(fields);
			} else {
				this.validation = validation;
				this.toggleLoading();
			}
		},
		getContactFields() {
			this.toggleLoading();

			const {
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip,
				address_observation,
			} = this;

			const fields = {
				cellphone_number: cleanPhone(cellphone_number),
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip: this.cleanZip(address_zip),
			};

			const validation = validate(fields);
			if (validation.valid) {
				fields.address_observation = address_observation;

				this.editUser(fields);
			} else {
				this.validation = validation;
				this.toggleLoading();
			}
		},
		editUser(fields) {
			this.$store.dispatch('EDIT_USER', fields)
				.then(() => {
					this.toggleLoading();
					this.populateFields();
					this.closeModal();
				})
				.catch((err) => {
					this.errorMessage = err.data[0].message ? err.data[0].message : 'Ocorreu um erro ao tentar atualizar seu cadastro. Tente novamente';
					this.toggleLoading();
				});
		},
		closeModal() {
			this.$emit('close', true);
		},
		cleanZip(zip) {
			return zip.replace(/\D+/g, '');
		},
		setAddress() {
			if (this.address_zip !== '') {
				getAddress(this.address_zip)
					.then((res) => {
						const { district, city, state, street } = res;
						this.address_neighbourhood = district;
						this.address_state = state;
						this.address_street = street;
						this.address_city = city;
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
	},
};
</script>
