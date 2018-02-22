<template>
	<div>
		<h1>Program: {{program.name}}</h1>

		<h2>Doação</h2>

		<form @submit.prevent="validateForm">
			<fieldset>
				<label for="amount">Escolha o valor da sua contribuição</label>

				<input type="radio" id="amount1" name="amount" v-model="amount" value="20">
				<label for="amount1">R$ 20,00</label>

				<input type="radio" id="amount2" name="amount" v-model="amount" value="40">
				<label for="amount2">R$ 40,00</label>

				<input type="radio" id="amount3" name="amount" v-model="amount" value="40">
				<label for="amount3">R$ 80,00</label>

				<input type="radio" id="amount4" name="amount" v-model="amount" value="40">
				<label for="amount4">R$ 200,00</label>

				<input type="radio" id="amount5" name="amount" v-model="amount" value="other">
				<label for="amount5">Outro valor</label>
				<input type="text" v-model="other" name="other"
					:disabled="amount === 'other' ? false : true">
			</fieldset>

			<fieldset>
				<label for="frequency">Escolha a periodicidade da contribuição</label>

				<input type="radio" id="frequency1" name="frequency" v-model="frequency" value="once">
				<label for="frequency1">Única vez</label>

				<input type="radio" id="frequency2" name="frequency" v-model="frequency" value="monthly">
				<label for="frequency2">Mensal</label>

				<input type="radio" id="frequency3" name="frequency" v-model="frequency" value="semester">
				<label for="frequency3">Semestral</label>
			</fieldset>
			<button type="submit">Quero doar</button>
		</form>
	</div>
</template>

<script>
import { validate } from '../../utilities';

export default {
	name: 'Program',
	props: {
		id: [String, Number],
	},
	data() {
		return {
			amount: '',
			frequency: '',
			other: '',
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
			const { amount, frequency, other } = this;
			const values = { amount, frequency, other };
			console.log(validate(values));
		},
	},
};
</script>
