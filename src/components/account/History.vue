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
						<td>Projeto</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="charge in charges" :key="charge.flotum_charge_id">
						<td>{{ charge.created_at | formatDate }}</td>
						<td>{{ charge.is_recurring ? 'Mensal' : 'Única' }}</td>
						<td><strong>R$ {{ charge.charge_amount | formatBRL }}</strong></td>
						<td>{{ statusType(charge.charge_transaction_status) }}</td>
						<td>{{ charge.origin === 'Default' ? 'Padrão' : charge.origin }}</td>
					</tr>
				</tbody>
			</table>
			<p v-else class="empty">Você ainda não registrou doações.</p>
		</section>
	</main>
</template>

<script>
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
	},
};
</script>
