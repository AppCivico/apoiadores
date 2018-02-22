<template>
	<div>
		<h1>Program: {{program.name}}</h1>

		<h2>Doação</h2>

		<form @submit.prevent="validateForm">
			<fieldset>
				<label for="quantity"></label>
				<input type="radio" id="quantity1" name="quantity" v-model="quantity" value="20"><label for="quantity1">R$ 20,00</label>
				<input type="radio" id="quantity21" name="quantity" v-model="quantity" value="40"><label for="quantity1">R$ 40,00</label>
			</fieldset>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Program',
	props: {
		id: [String, Number],
	},
	data() {
		return {
			quantity: '',
		};
	},
	computed: {
		programs() {
			return this.$store.state.programs;
		},
		program() {
			return this.$store.state.selectedProgram;
		},
	},
	mounted() {
		if (!this.program.name) {
			this.$store.dispatch('LOAD_MERCHANTS')
				.then(() => {
					const program = this.programs.find(item => item.id === this.id);
					this.$store.dispatch('CHANGE_SELECTED_PROGRAM', program);
				});
		}
	},
	methods: {
		validateForm() {
			const { quantity } = this;

			console.log(quantity);
		},
	},
};
</script>
