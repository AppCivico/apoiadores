import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import Projects from '@/components/Projects';
import Project from '@/components/Project';
import Program from '@/components/steps/Program';
import Rewards from '@/components/steps/Rewards';
import IsRegistered from '@/components/steps/IsRegistered';
import Register from '@/components/steps/Register';
import Payment from '@/components/steps/Payment';
import Finish from '@/components/steps/Finish';
import MyAccount from '@/components/account/myAccount';
import History from '@/components/account/History';
import forgotPassword from '@/components/account/forgotPassword';
import resetPassword from '@/components/account/resetPassword';

import config from '../config';

Vue.use(Router);

const customHomepage = {
	projects: Projects,
};

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component:
				config.homepage === '' ? Home : customHomepage[config.homepage],
		},
		{
			path: '/projects',
			name: 'Projects',
			component: Projects,
		},
		{
			path: '/projects/:id',
			name: 'Project',
			component: Project,
			props: true,
		},
		{
			path: '/program/:id',
			name: 'Program',
			component: Program,
			props: true,
		},
		{
			path: '/rewards',
			name: 'Rewards',
			component: Rewards,
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
			meta: { requiresLogin: true },
		},
		{
			path: '/my-account/history',
			name: 'History',
			component: History,
			meta: { requiresLogin: true },
		},
		{
			path: '/my-account/password',
			name: 'forgotPassword',
			component: forgotPassword,
		},
		{
			path: '/my-account/reset-password',
			name: 'resetPassword',
			component: resetPassword,
			query: { key: true },
		},
	],
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});
