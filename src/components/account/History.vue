<template>
	<main class="container my-account">
		<section class="content history">
			<h2>Minha Conta</h2>
			<h3>Histório de doações</h3>
			<table v-if="charges.length > 0">
				<thead>
					<tr>
						<td>Data e hora</td>
						<td>Periodicidade</td>
						<td>Valor</td>
						<td>Status</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="charge in charges" :key="charge.flotum_charge_id">
						<td>{{ formatDate(charge.created_at) }}</td>
						<td>{{ charge.is_recurring ? 'Mensal' : 'Única' }}</td>
						<td><strong>R$ {{ charge.charge_amount | formatBRL }}</strong></td>
						<td>{{ statusType(charge.charge_transaction_status) }}</td>
					</tr>
				</tbody>
			</table>
		</section>
	</main>
</template>

<script>
/* eslint-disable camelcase */
import creditCardType from 'credit-card-type';

export default {
	name: 'MyAccount',
	data() {
		return {
			status: {
				captured: 'Confirmada',
				cancelled: 'Cancelada',
			},
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_CHARGES');
	},
	computed: {
		charges() {
			return this.$store.state.charges;
		},
		user() {
			return this.$store.state.user;
		},
	},
	methods: {
		statusType(type) {
			return this.status[type] ? this.status[type] : type;
		},
		formatDate(data) {
			const week = [
				'Segunda-feira',
				'Terça-feira',
				'Quarta-feira',
				'Quinta-feira',
				'Sexta-feira',
				'Sábado',
				'Domingo',
			];
			const months = [
				'Janeiro',
				'Fevereiro',
				'Março',
				'Abril',
				'Maio',
				'Junho',
				'Julho',
				'Agosto',
				'Setembro',
				'Outubro',
				'Novembro',
				'Dezembro',
			];
			const date = new Date(data);

			const weekDay = week[date.getDay()];
			const day = date.getDate();
			const month = months[date.getMonth()];
			const year = date.getFullYear();

			const time = data
				.split('T')[1]
				.replace(':', 'h')
				.split(':')[0];

			return `${weekDay}, ${day} de ${month} de ${year} - ${time}`;
		},
	},
};
</script>
