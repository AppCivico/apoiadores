import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Program from '@/components/steps/Program';
import IsRegistered from '@/components/steps/IsRegistered';
import Register from '@/components/steps/Register';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/program/:id',
			name: 'Program',
			component: Program,
			props: true,
		},
		{
			path: '/is-registered',
			name: 'IsRegistered',
			component: IsRegistered,
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
		},
	],
});
