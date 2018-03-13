<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>
			<h3>Contribuição realizada com sucesso!</h3>
			<p>Você contribuiu com o valor de R$ {{ donation.amount | formatBRL }} para a {{ name }}</p>
			<router-link to="/">voltar a página inicial</router-link>
		</section>
		<aside>
			<div class="steps">
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
				<span class="active">5</span>
			</div>
			<hr>
			<h2>Obrigado</h2>
		</aside>
	</main>
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
