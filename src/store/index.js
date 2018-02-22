/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		programs: [],
		selectedProgram: {},
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
	},
	mutations: {
		SET_PROGRAMS(state, { res }) {
			const merchant = res.merchants.find(item => item.domain === config.domain);
			state.programs = merchant.merchant_programs;
		},
		SET_SELECTED_PROGRAM(state, { program }) {
			state.selectedProgram = program;
		},
	},
});

export default store;
