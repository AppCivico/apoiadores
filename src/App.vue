<template>
	<div class="shell">
		<header role="banner" :class="this.header ? 'open' : ''">
				<div class="container">
				<router-link to="/" tag="h1">{{ title }}</router-link>

				<div class="btn-group">
					<button :class="`btn btn__nav ${this.target === 'nav' ? 'selected' : 'unselected'}`" @click="toggleHeader('nav')">Menu</button>
					<button :class="`btn btn__login ${this.target === 'login' ? 'selected' : 'unselected'}`" @click="toggleHeader('login')">Login</button>
				</div>

				<nav :class="this.target === 'nav' ? 'active' : ''">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Faça uma Doação</a></li>
						<li><a href="#">Doe seu Serviço</a></li>
						<li><a href="#">Compartilhe um Sonho</a></li>
						<li><a href="#">Perguntas Frequentes</a></li>
						<li><a href="#">Contato</a></li>
					</ul>
				</nav>

				<div :class="`login-wrapper ${this.target === 'login' ? 'active' : ''}`">
					<Login route="/my-account"/>
				</div>
			</div>
		</header>

		<router-view/>

		<footer>
			<div class="container">
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
			header: false,
			target: '',
		};
	},
	methods: {
		toggleHeader(target) {
			if (this.header) {
				this.target = '';
			} else {
				this.target = target;
			}

			this.header = !this.header;
		},
	},
};
</script>

<style src="./stylesheets/index.scss" lang="scss"></style>
