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
		donations: [],
		flotum: '',
		merchant: {},
		newCard: {},
		programs: [],
		projects: [],
		selectedOption: {
			type: '',
			data: {},
		},
		logged: false,
		user: {},
	},
	actions: {
		LOAD_MERCHANTS({ commit }) {
			return new Promise((resolve, reject) => {
				axios.get(`${config.api}/public/merchant-programs`).then(
					(response) => {
						commit('SET_PROGRAMS', { res: response.data });
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		CHANGE_SELECTED_OPTION({ commit }, payload) {
			return new Promise((resolve) => {
				commit('SET_SELECTED_OPTION', { payload });
				resolve();
			});
		},
		CHANGE_DONATION({ commit }, data) {
			return new Promise((resolve) => {
				commit('SET_DONATION', { data });
				resolve();
			});
		},
		LOAD_DONATIONS({ state, commit }, id) {
			return new Promise((resolve, reject) => {
				axios.get(`${config.api}/public/merchants/${state.merchant.id}/projects/${id}/donors`).then(
					(response) => {
						commit('SET_DONATIONS', { res: response.data });
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		CREATE_USER({ commit }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/signup`,
					data,
				}).then(
					(response) => {
						commit('SET_USER', { data: response.data });
						resolve();
					},
					(err) => {
						console.error(err.response);
						reject(err.response);
					},
				);
			});
		},
		EDIT_USER({ commit, state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}?api_key=${state.apiKey}`,
					data,
				}).then(
					(response) => {
						const newData = {
							api_key: state.apiKey,
							user: response.data,
						};
						commit('SET_USER', { data: newData });
						resolve();
					},
					(err) => {
						console.error(err);
						reject(err.response);
					},
				);
			});
		},
		LOAD_USER({ commit, state }) {
			return new Promise((resolve, reject) => {
				axios
					.get(`${config.api}/user/${state.user.id}?api_key=${state.apiKey}`)
					.then(
						(response) => {
							const newData = {
								api_key: state.apiKey,
								user: response.data,
							};
							commit('SET_USER', { data: newData });
							resolve();
						},
						(err) => {
							reject(err.response);
							console.error(err);
						},
					);
			});
		},
		LOGIN({ commit }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/login`,
					data,
				}).then(
					(response) => {
						commit('SET_USER', { data: response.data });
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		CHANGE_USER({ commit }, data) {
			return new Promise((resolve) => {
				commit('SET_USER', { data });
				resolve();
			});
		},
		LOGOUT({ commit }) {
			return new Promise((resolve) => {
				commit('CLEAR_USER');
				resolve();
			});
		},
		GET_FLOTUM({ commit, state }) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}/credit-cards?api_key=${
						state.apiKey
					}`,
				}).then(
					(response) => {
						commit('SET_FLOTUM', { data: response.data });
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		REGISTER_CARD({ commit, state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: state.flotum,
					data,
				}).then(
					(response) => {
						commit('SET_NEW_CARD', { data: response.data });
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		REMOVE_CARD({ state }, id) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${
						state.user.id
					}/credit-cards/${id}?api_key=${state.apiKey}`,
				}).then(
					(response) => {
						resolve(response);
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		SEND_SUBSCRIPTION({ state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user/${state.user.id}/subscriptions?api_key=${
						state.apiKey
					}`,
					data,
				}).then(
					() => {
						resolve();
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		LOAD_CHARGES({ commit, state }, rows) {
			// eslint-disable-next-line
			const url =
				rows > 0
					? `${config.api}/user/${state.user.id}/charges?rows=${rows}&api_key=${
						state.apiKey
					}`
					: `${config.api}/user/${state.user.id}/charges?api_key=${
						state.apiKey
					}`;
			axios.get(url).then(
				(response) => {
					commit('SET_CHARGES', { data: response.data.charges });
				},
				(err) => {
					console.error(err);
				},
			);
		},
		// eslint-disable-next-line
		SEND_TOKEN({ state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user-forgot-password/email`,
					data,
				}).then(
					(response) => {
						resolve(response);
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
		// eslint-disable-next-line
		EDIT_PASSWORD({ state }, data) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					url: `${config.api}/user-forgot-password/reset-password`,
					data,
				}).then(
					(response) => {
						resolve(response);
					},
					(err) => {
						reject(err.response);
						console.error(err);
					},
				);
			});
		},
	},
	mutations: {
		SET_PROGRAMS(state, { res }) {
			const merchant = res.merchants.find(
				item => item.domain === config.domain,
			);
			state.merchant = merchant;
			state.programs = merchant.merchant_programs;
			state.projects = merchant.merchant_projects;
		},
		SET_SELECTED_OPTION(state, { payload }) {
			state.selectedOption = payload;
		},
		SET_DONATION(state, { data }) {
			state.donation = data;
		},
		SET_DONATIONS(state, { res }) {
			state.donations = res.donors;
		},
		SET_USER(state, { data }) {
			state.apiKey = data.api_key;
			state.user = data.user;
			state.logged = true;

			if (window.sessionStorage) {
				sessionStorage.setItem('api-key', data.api_key);
				sessionStorage.setItem('user', JSON.stringify(data.user));
			}
		},
		CLEAR_USER(state) {
			state.logged = false;

			if (window.sessionStorage) {
				sessionStorage.removeItem('api-key');
				sessionStorage.removeItem('user');
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
