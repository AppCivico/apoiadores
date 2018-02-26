<template>
	<div>
		<h1>Finish</h1>
		<h2>Contribuição realizada com sucesso!</h2>
		<p>Você contribuiu com o valor de R$ {{ donation.amount | formatBRL }} para a {{ name }}</p>
		<router-link to="/">voltar a página inicial</router-link>
	</div>
</template>

<script>
import config from '../../config';

export default {
	name: 'Finish',
	computed: {
		donation() {
			return this.$store.state.donation;
		},
		name() {
			return config.name;
		},
	},
};
</script>
