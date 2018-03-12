<template>
	<main class="container">
		<section class="content">
			<h2>Doação</h2>
			<h3>Já tem cadastro?</h3>

			<Login route="/payment"/>
		</section>
		<aside>
			<h3>Você é novo por aqui?</h3>
			<p>Faça já seu cadastro e tenha acesso ao sistema de doações da Rede Sustentabilidade o que possibilita doações recorrentes.</p>
			<router-link to="/register" class="btn">Cadastre-se</router-link>
		</aside>
	</main>
</template>

<script>
import Login from '../Login';

export default {
	name: 'IsRegistered',
	components: {
		Login,
	},
};
</script>
