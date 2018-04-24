<template>
	<main :class="`container ${selectedType === 'donation' ? '' : 'theme_project'}`">
		<section class="content">
			<h2>{{ selectedType === 'donation' ? 'Doação' : 'Compartilhe um sonho' }}</h2>
			<h3>Já tem cadastro?</h3>

			<Login route="/payment"/>


			<h3>Você é novo por aqui?</h3>
			<p>Faça já seu cadastro e tenha acesso ao sistema de doações
				da Rede Sustentabilidade o que possibilita doações recorrentes.</p>
			<router-link to="/register" class="btn">Cadastre-se</router-link>
		</section>
		<aside>
			<div class="steps">
				<span>1</span>
				<span class="active">2</span>
				<span>3</span>
				<span>4</span>
				<span>5</span>
			</div>
			<hr>
			<img
				v-if="selectedType === 'donation'"
				src="../../assets/img/donation/step_login.png"
				alt="Icon">
			<img
				v-else
				src="../../assets/img/project/step_login.png"
				alt="Icon">
			<h2>Faça seu login</h2>
			<p>Para realizar a emissão do recibo eleitoral é necessário realizar um cadastro na plataforma. Ele é simples e rápido.</p>
		</aside>
	</main>
</template>

<script>
import Login from '../Login';
import config from '../../config';

export default {
	name: 'IsRegistered',
	components: {
		Login,
	},
	computed: {
		selectedType() {
			return this.$store.state.selectedOption.type;
		},
	},
};
</script>
