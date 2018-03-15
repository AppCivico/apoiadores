<template>
	<div
		:class="`modal ${ this.isOpen ? 'active' : ''}`"
		@click.stop="closeModal"
	>
		<div class="modal__content">
			<h3>Altere os dados de
				{{ this.type === 'card' ? 'seu cartão de crédito' : 'acesso' }}
			</h3>

			<form @submit.prevent="validateAccess" v-if="this.type === 'access'">
				<div
					:class="`input-wrapper
					${validation.errors.cpf ? 'has-error' : ''}`"
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
					:class="`input-wrapper
					${validation.errors.email ? 'has-error' : ''}`"
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
					:class="`input-wrapper
					${validation.errors.password ? 'has-error' : ''}`"
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
					:class="`input-wrapper
					${validation.errors.password_confirm ? 'has-error' : ''}`"
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
		</div>
	</div>
</template>

<script>
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
		}
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
			this.cellphone_number = cellphone_number;
			this.address_city = address_city;
			this.address_neighbourhood = address_neighbourhood;
			this.address_number = address_number;
			this.address_state = address_state;
			this.address_street = address_street;
			this.address_observation = address_observation;
			this.address_zip = address_zip;
		},
		validateAccess() {
			this.toggleLoading();

			let fields = {}
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
				}
			} else {
				fields = {
					cpf,
					email,
				}
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
		editUser(fields) {
			console.log('edit', fields);
			this.$store.dispatch('EDIT_USER', fields)
				.then(() => {
					console.log('editou');
					this.toggleLoading();
					this.populateFields();
					this.closeModal();
				})
				.catch(() => {
					this.errorMessage = 'Ocorreu um erro ao tentar atualizar seu cadastro. Tente novamente';
				});
		},
		closeModal() {
			this.active = false;
		},
	}
}
</script>
