<template>
	<div class="shell">
		<header role="banner" :class="this.header ? 'open' : ''">
				<div class="container">
				<router-link to="/" tag="h1">{{ title }}</router-link>

				<div class="nav_btn-group">
					<button :class="`nav_btn nav_btn__nav ${this.target === 'nav' ? 'selected' : 'unselected'}`" @click="toggleHeader('nav')">Menu</button>
					<button :class="`nav_btn nav_btn__login ${this.target === 'login' ? 'selected' : 'unselected'}`" @click="toggleHeader('login')">Login</button>
				</div>

				<nav :class="this.target === 'nav' ? 'active' : ''">
					<ul>
						<li><router-link to="/" @click.native="toggleHeader('')">Home</router-link></li>
						<li v-if="donation"><router-link :to="`/program/${donation.id}`" @click.native="toggleHeader('')">Faça uma Doação</router-link></li>
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
						<li v-for="partner in partners" :key="partner.id">
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
	computed: {
		donation() {
			return this.$store.state.programs[0];
		},
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
