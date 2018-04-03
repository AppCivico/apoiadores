<template>
		<main :class="`container ${selectedType === 'donation' ? '' : 'theme_project'}`">
		<section class="content">
			<h2>{{ selectedType === 'donation' ? 'Doação' : 'Compartilhe um sonho' }}</h2>
			<h3>Contribuição registrada com sucesso!</h3>
			<p>Você contribuiu com o valor de R$ {{ donation.amount | formatBRL }}
				para a {{ name }}. O pagamento esta sendo processado, confirmaremos em breve.</p>
			<p><router-link to="/">voltar a página inicial</router-link></p>
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
			<img
				v-if="selectedType === 'donation'"
				src="../../assets/img/donation/step_thanks.png"
				alt="Icon">
			<img
				v-else
				src="../../assets/img/project/step_thanks.png"
				alt="Icon">
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
