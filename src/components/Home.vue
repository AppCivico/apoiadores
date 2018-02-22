<template>
	<div>
		<h1>Rede</h1>

		<h2>Programs</h2>
		<ul>
			<li v-for="program in programs" :key="program.id">
				<router-link :to="`/program/${program.id}`">
					{{ program.name}}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Home',
	computed: {
		programs() {
			return this.$store.state.programs;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_MERCHANTS');
	},
};
</script>
