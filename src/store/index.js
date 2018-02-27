/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		charges: [],
		donation: {},
		flotum: '',
		merchant: {},
		newCard: {},
		programs: [],
		selectedProgram: {},
	},
	actions: {
		LOAD_MERCHANTS({ commit }) {
			return new Promise((resolve, reject) => {
				axios.get(`${config.api}/public/merchant-programs`).then((response) => {
					commit('SET_PROGRAMS', { res: response.data });
					resolve();
				}, (err) => {
					reject(err);
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
						reject(err);
					});
			});
		},
		LOGIN({ commit }, data) {
			return new Promise((resolve, reject) => {
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
						reject(err);
						console.error(err);
					});
			});
		},
		GET_FLOTUM({ commit, state }) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}/credit-cards?api_key=${state.apiKey}`,
				})
					.then((response) => {
						commit('SET_FLOTUM', { data: response.data });
						resolve();
					}, (err) => {
						reject(err);
						console.error(err);
					});
			});
		},
		REGISTER_CARD({ commit, state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: state.flotum,
					data,
				})
					.then((response) => {
						commit('SET_NEW_CARD', { data: response.data });
						resolve();
					}, (err) => {
						reject(err);
						console.error(err);
					});
			});
		},
		SEND_SUBSCRIPTION({ state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}/subscriptions?api_key=${state.apiKey}`,
					data,
				})
					.then(() => {
						resolve();
					}, (err) => {
						reject(err);
						console.error(err);
					});
			});
		},
		LOAD_CHARGES({ commit, state }) {
			axios.get(`${config.api}/user/${state.user.id}/charges?api_key=${state.apiKey}`).then((response) => {
				commit('SET_CHARGES', { data: response.data });
			}, (err) => {
				console.error(err);
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
		SET_NEW_CARD(state, { data }) {
			state.newCard = data;
		},
		SET_CHARGES(state, { data }) {
			state.charges = data;
		},
	},
});

export default store;
