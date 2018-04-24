// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';

import { formatBRL, formatDate, formatCNPJ, formatDateBasic } from './utilities';

Vue.config.productionTip = false;
Vue.filter('formatBRL', formatBRL);
Vue.filter('formatDate', formatDate);
Vue.filter('formatCNPJ', formatCNPJ);
Vue.filter('formatDateBasic', formatDateBasic);
Vue.filter('upperCase', value => value.toUpperCase());

// Some middleware to help ensure the program was selected
router.beforeEach((to, from, next) => {
	if (window.sessionStorage) {
		const apiKey = sessionStorage.getItem('api-key');
		const user = sessionStorage.getItem('user');
		if (user !== null && apiKey !== null) {
			const data = {
				api_key: apiKey,
				user: JSON.parse(user),
			};
			store.dispatch('CHANGE_USER', data);
		}
	}

	if (
		to.matched.some(record => record.meta.requiresProgram) &&
		!store.state.selectedOption.type
	) {
		window.console.log('No program selected');
		next({
			path: '/',
			query: { redirect: to.fullPath },
		});
	} else {
		next();
	}

	if (
		to.matched.some(record => record.meta.requiresLogin) &&
		!store.state.logged
	) {
		window.console.log('Not authorized!');
		next({
			path: '/',
			query: { redirect: to.fullPath },
		});
	} else {
		next();
	}
});

sync(store, router);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
});
