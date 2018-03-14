import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Program from '@/components/steps/Program';
import IsRegistered from '@/components/steps/IsRegistered';
import Register from '@/components/steps/Register';
import Payment from '@/components/steps/Payment';
import Finish from '@/components/steps/Finish';
import MyAccount from '@/components/account/myAccount';

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
			meta: { requiresProgram: true },
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: { requiresProgram: true },
		},
		{
			path: '/payment',
			name: 'Payment',
			component: Payment,
			meta: { requiresProgram: true },
		},
		{
			path: '/finish',
			name: 'Finish',
			component: Finish,
			meta: { requiresProgram: true },
		},
		{
			path: '/my-account',
			name: 'MyAccount',
			component: MyAccount,
			props: true,
		},
	],
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
});
