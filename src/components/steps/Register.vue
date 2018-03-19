<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>

			<form @submit.prevent="validateForm">
				<fieldset>
					<h3>Dados pessoais</h3>
					<div
						:class="`input-wrapper half
						${validation.errors.first_name ? 'has-error' : ''}`"
					>
						<label for="first_name">Nome</label>
						<input
							type="text"
							name="first_name"
							v-model="first_name">
						<div class="error" v-if="validation.errors.first_name">
							{{ validation.errors.first_name }}
						</div>
					</div>
					<div
						:class="`input-wrapper half
						${validation.errors.last_name ? 'has-error' : ''}`"
					>
						<label for="last-name">Sobrenome</label>
						<input
							type="text"
							name="last_name"
							v-model="last_name">
						<div class="error" v-if="validation.errors.last_name">
							{{ validation.errors.last_name }}
						</div>
					</div>
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
							v-model="password">
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
							v-model="password_confirm">
						<div class="error" v-if="validation.errors.password_confirm">
							{{ validation.errors.password_confirm }}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<h3>Dados de contato</h3>
					<div
						:class="`input-wrapper
						${validation.errors.cellphone_number ? 'has-error' : ''}`"
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
						:class="`input-wrapper half
						${validation.errors.address_zip ? 'has-error' : ''}`"
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
						:class="`input-wrapper
						${validation.errors.address_street ? 'has-error' : ''}`"
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
						:class="`input-wrapper half
						${validation.errors.address_number ? 'has-error' : ''}`"
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
						:class="`input-wrapper half
						${validation.errors.address_observation ? 'has-error' : ''}`"
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
						:class="`input-wrapper
						${validation.errors.address_neighbourhood ? 'has-error' : ''}`"
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
						:class="`input-wrapper half
						${validation.errors.address_city ? 'has-error' : ''}`"
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
						:class="`input-wrapper half
						${validation.errors.address_state ? 'has-error' : ''}`"
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
				</fieldset>
				<p class="error" v-if="errorMessage != ''">
					{{ errorMessage }}
				</p>
				<button type="submit" :disabled="loading">Continuar</button>
			</form>
		</section>
		<aside>
			<div class="steps">
				<span>1</span>
				<span>2</span>
				<span class="active">3</span>
				<span>4</span>
				<span>5</span>
			</div>
			<hr>
			<img src="../../assets/img/donation/step_register.png" alt="Icon">
			<h2>Informações pessoais</h2>
			<p>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</p>
		</aside>
	</main>
</template>

<script>
/* eslint-disable camelcase */
import { mask } from 'vue-the-mask';
import { validate, getAddress, cleanPhone } from '../../utilities';
import config from '../../config';

export default {
	name: 'Register',
	directives: {
		mask,
	},
	data() {
		return {
			loading: false,
			errorMessage: '',
			first_name: '',
			last_name: '',
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
			name: config.name,
			validation: {
				errors: {},
			},
		};
	},
	computed: {
		merchant() {
			return this.$store.state.merchant;
		},
	},
	methods: {
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
		validateForm() {
			this.toggleLoading();

			const {
				first_name,
				last_name,
				cpf,
				email,
				password,
				password_confirm,
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_observation,
				address_zip,
			} = this;

			const fields = {
				first_name,
				last_name,
				cpf,
				email,
				password,
				password_confirm,
				cellphone_number,
				address_city,
				address_neighbourhood,
				address_number,
				address_state,
				address_street,
				address_zip: this.cleanZip(address_zip),
			};

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
				fields.address_observation = address_observation;
				fields.cellphone_number = cleanPhone(cellphone_number);
				fields.merchant_id = this.merchant.id;

				this.registerUser(fields);
			} else {
				this.validation = validation;
				this.toggleLoading();
			}
		},
		registerUser(data) {
			this.$store.dispatch('CREATE_USER', data)
				.then(() => {
					this.$router.push({ path: '/payment' });
				})
				.catch((err) => {
					// exemplo de erro no axios feito direito, laís
					console.log(err);
					this.errorMessage = 'Ocorreu um erro ao tentar criar seu registro. Tente novamente';
					this.toggleLoading();
				});
		},
		cleanZip(zip) {
			return zip.replace(/\D+/g, '');
		},
		toggleLoading() {
			this.loading = !this.loading;
		},
	},
};
</script>
