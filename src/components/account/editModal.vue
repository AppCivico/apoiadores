<template>
	<div class="modal">
		<div class="modal__content">
			<h3>Altere os dados de
				{{ this.type === 'card' ? 'seu cartão de crédito' : 'acesso' }}
			</h3>

			<form @submit.prevent="validateForm" v-if="this.type === 'access'">
				<div
					:class="`input-wrapper
					${validation.errors.cpf ? 'has-error' : ''}`"
				>
					<label for="cpf">CPF</label>
					<input
						type="text"
						name="cpf"
						v-model="user.cpf"
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
						v-model="user.email">
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
						v-model="user.password">
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
						v-model="user.password_confirm">
					<div class="error" v-if="validation.errors.password_confirm">
						{{ validation.errors.password_confirm }}
					</div>
				</div>
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
	},
	directives: {
		mask,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	data() {
		return {
			loading: false,
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
		};
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
		validateForm() {
			console.log('oi');
		},
	}
}
</script>
