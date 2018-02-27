<template>
	<div>
		<h1>My account</h1>

		<section>
			<h2>Histório de doações</h2>
		</section>

		<section>
			<h3>Meus dados de acesso</h3>
			<div class="content">
				<p>
					<strong>Email cadastrado</strong><br>
					{{ user.email }}
				</p>
				<p>
					<strong>Senha</strong><br>
					********
				</p>
				<p>
					<strong>CPF</strong><br>
					{{ user.cpf }}
				</p>
			</div>
			<button type="button" @click="edit('access')">Alterar</button>
		</section>

		<section>
			<h3>Meus dados de contato</h3>
			<div class="content">
				<p>
					<strong>Telefone</strong><br>
					{{ maskPhone(user.cellphone_number) }}
				</p>
				<p>
					<strong>Endereço</strong><br>
					{{ user.address_street }},
					{{ user.address_number }}
					<span v-if="user.address_observation"> - </span>
					{{ user.address_observation }}<br>
					{{ user.address_neighbourhood }} -
					CEP {{ user.address_zip }}<br>
					{{ user.address_city }} - {{ user.address_state }}
				</p>
			</div>
			<button type="button" @click="edit('contact')">Alterar</button>
		</section>

		<section>
			<h3>Meus dados financeiros</h3>
			<div class="content">
				<p>
					<strong>Cartão de Crédito</strong><br>
					<template v-if="user.credit_cards.length > 0">
						<p class="card" v-for="card in user.credit_cards">
							{{ niceType(card.brand) }} com final {{ endNumber(card.mask) }}
						</p>
					</template>
				</p>
			</div>
			<button type="button" @click="edit('cards')">Alterar</button>
		</section>
	</div>
</template>

<script>
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

export default {
	name: 'MyAccount',
	mounted() {
		this.$store.dispatch('LOAD_CHARGES');
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	methods: {
		edit(type) {
			console.log('editar', type);
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
		maskPhone(phone) {
			const currentPhone = phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
			// eslint-disable-next-line
			return !currentPhone[2] ? currentPhone[1] : '(' + currentPhone[1] + ') ' + currentPhone[2] + (currentPhone[3] ? '-' + currentPhone[3] : '');
		},
	},
};
</script>

<style scoped>
	section {
		border: 1px solid #000;
	}
</style>
