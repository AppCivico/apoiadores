// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// Some middleware to help ensure the program was selected
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresProgram) &&
		(!store.state.selectedProgram.name)) {
		window.console.log('No program selected');
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
