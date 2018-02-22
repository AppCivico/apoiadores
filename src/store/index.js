/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		merchant: {},
		programs: [],
		selectedProgram: {},
		donation: {},
		flotum: '',
	},
	actions: {
		LOAD_MERCHANTS({ commit }) {
			return new Promise((resolve) => {
				axios.get(`${config.api}/public/merchant-programs`).then((response) => {
					commit('SET_PROGRAMS', { res: response.data });
					resolve();
				}, (err) => {
					console.error(err);
				});
			});
		},
		CHANGE_SELECTED_PROGRAM({ commit }, program) {
			return new Promise((resolve) => {
				commit('SET_SELECTED_PROGRAM', { program });
				resolve();
			});
		},
		CHANGE_DONATION({ commit }, data) {
			return new Promise((resolve) => {
				commit('SET_DONATION', { data });
				resolve();
			});
		},
		CREATE_USER({ commit }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/signup`,
					data,
				})
					.then((response) => {
						commit('SET_USER', { data: response.data });
						resolve();
					}, (err) => {
						console.error(err);
					});
			});
		},
		LOGIN({ commit }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/login`,
					data,
				})
					.then((response) => {
						commit('SET_USER', { data: response.data });
						resolve();
					}, (err) => {
						console.error(err);
					});
			});
		},
		GET_FLOTUM({ commit, state }) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}/credit-cards?api_key=${state.apiKey}`,
				})
					.then((response) => {
						commit('SET_FLOTUM', { data: response.data });
						resolve();
					}, (err) => {
						console.error(err);
					});
			});
		},
		// eslint-disable-next-line
		REGISTER_CARD({ state }, data) {
			return new Promise((resolve) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: state.flotum,
					data,
				})
					.then(() => {
						resolve();
					}, (err) => {
						console.error(err);
					});
			});
		},
	},
	mutations: {
		SET_PROGRAMS(state, { res }) {
			const merchant = res.merchants.find(item => item.domain === config.domain);
			state.merchant = merchant;
			state.programs = merchant.merchant_programs;
		},
		SET_SELECTED_PROGRAM(state, { program }) {
			state.selectedProgram = program;
		},
		SET_DONATION(state, { data }) {
			state.donation = data;
		},
		SET_USER(state, { data }) {
			state.apiKey = data.api_key;
			state.user = data.user;

			if (window.sessionStorage) {
				sessionStorage.setItem('api-key', data.api_key);
				sessionStorage.setItem('user', JSON.stringify(data.user));
			}
		},
		SET_FLOTUM(state, { data }) {
			state.flotum = data.href;
		},
	},
});

export default store;
