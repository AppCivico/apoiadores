<template>
	<div>
		<h1>Rede</h1>

		<nav>
			<Login route="/my-account"/>
		</nav>

		<h2>Programs</h2>
		<ul>
			<li v-for="program in programs" :key="program.id" @click="setCurrentProgram(program)">
				{{ program.name}}
			</li>
		</ul>
	</div>
</template>

<script>
import Login from './Login';

export default {
	name: 'Home',
	components: {
		Login,
	},
	computed: {
		programs() {
			return this.$store.state.programs;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_MERCHANTS');
	},
	methods: {
		setCurrentProgram(program) {
			this.$store.dispatch('CHANGE_SELECTED_PROGRAM', program)
				.then(() => {
					this.$router.push({ path: `/program/${program.id}` });
				});
		},
	},
};
</script>
