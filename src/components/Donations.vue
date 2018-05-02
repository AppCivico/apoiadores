<template>
	<main class="container project theme_project">
		<article class="content">
			<h2>TRANSPARÊNCIA</h2>
			<h3 v-if="project">{{ project.name }}</h3>
			<table v-if="donations.length > 0">
				<thead>
					<tr>
						<td>Doador</td>
						<td>Data e hora</td>
						<td>Valor</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(donation, key) in donations" :key="key">
						<td>{{ donation.name }}</td>
						<td>{{ donation.created_at | formatDate }}</td>
						<td><strong>R$ {{ donation.amount | formatBRL }}</strong></td>
					</tr>
				</tbody>
			</table>
		</article>
	</main>
</template>

<script>
export default {
	name: 'Donations',
	props: {
		id: String,
	},
	mounted() {
		if (this.projects.length < 1) {
			this.$store.dispatch('LOAD_MERCHANTS')
				.then(() => {
					this.$store.dispatch('LOAD_DONATIONS', this.id);
				});
		} else {
			this.$store.dispatch('LOAD_DONATIONS', this.id);
		}
	},
	computed: {
		projects() {
			return this.$store.state.projects;
		},
		project() {
			return this.projects.find(item => `${item.id}` === this.id);
		},
		donations() {
			return this.$store.state.donations;
		},
	},
};
</script>
