<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>
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
			<img src="../../assets/img/donation/step_login.png" alt="Icon">
			<h2>Faça seu login</h2>
			<p>Você não precisa ser filiado para colaborar financeiramente com a {{ name }}.</p>
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
	data() {
		return {
			name: config.name,
		};
	},
};
</script>
