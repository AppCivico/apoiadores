<template>
	<div class="shell">
		<header>
			<h1>{{ title }}	</h1>

			<div class="btn-group">
				<button>Menu</button>
				<button>Login</button>
			</div>

			<nav>
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Faça uma Doação</a></li>
					<li><a href="#">Doe seu Serviço</a></li>
					<li><a href="#">Compartilhe um Sonho</a></li>
					<li><a href="#">Perguntas Frequentes</a></li>
					<li><a href="#">Contato</a></li>
				</ul>
			</nav>

			<Login route="/my-account"/>
		</header>
		<main>
			<router-view/>
		</main>
		<footer>
			<h1>{{ title }}</h1>
			<h2>{{ title | upperCase }}</h2>

			<div class="partners" v-if="partners.length > 0">
				<strong>Powered by</strong>
				<ul>
					<li v-for="partner in partners">
						<a :href="partner.url" target="_blank">
							<img :src="partner.logo" :alt="partner.name">
						</a>
					</li>
				</ul>
			</div>
		</footer>
	</div>
</template>

<script>
import Login from './components/Login';
import config from './config';

export default {
	name: 'App',
	components: {
		Login,
	},
	data() {
		return {
			title: config.name,
			partners: config.partners,
			logos: config.logos,
		};
	},
};
</script>

<style src="./stylesheets/index.scss" lang="scss"></style>
