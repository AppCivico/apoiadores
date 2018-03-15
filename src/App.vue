<template>
	<div class="shell">
		<header role="banner" :class="this.header ? 'open' : ''">
				<div class="container">
				<router-link to="/" tag="h1">{{ title }}</router-link>

				<nav class="main">
					<ul>
						<li
							:class="`main__nav ${this.target === 'nav' ? 'selected' : 'unselected'}`"
							@click="toggleHeader('nav')">
							<span>Menu</span>
						</li>
						<li
							v-if="!logged"
							:class="`main__login ${this.target === 'login' ? 'selected' : 'unselected'}`"
							@click="toggleHeader('login')">
								<span>Login</span>
						</li>
						<li
							v-if="logged"
							class="main__user"
						>
							<span>{{ user.first_name }} {{ user.last_name }}</span>
							<ul>
								<li>
									<router-link to="/my-account">Minha conta</router-link>
								</li>
								<li>
									<router-link to="/my-account/history">Histórico de doações</router-link>
								</li>
								<li>
									<a href="#" @click.prevent="logout">Sair</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>

				<nav :class="`secundary ${this.target === 'nav' ? 'active' : ''}`">
					<ul>
						<li><router-link to="/" @click.native="toggleHeader('')">Home</router-link></li>
						<li v-if="donation">
							<router-link
								:to="`/program/${donation.id}`"
								@click.native="toggleHeader('')">
									Faça uma Doação
								</router-link>
						</li>
					</ul>
				</nav>

				<div v-if="!logged" :class="`login-wrapper ${this.target === 'login' ? 'active' : ''}`">
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
		logged() {
			return this.$store.state.logged;
		},
		user() {
			return this.$store.state.user;
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
	mounted() {
		this.checkUser();
	},
	methods: {
		checkUser() {
			if (window.sessionStorage) {
				const apiKey = sessionStorage.getItem('api-key');
				const user = sessionStorage.getItem('user');
				if (user !== null && apiKey !== null) {
					const data = {
						api_key: apiKey,
						user: JSON.parse(user),
					};
					this.$store.dispatch('CHANGE_USER', data);
				}
			}
		},
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
