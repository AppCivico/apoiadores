/* eslint-disable no-undef, arrow-body-style, no-param-reassign, no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    programs: [],
  },
  actions: {
    LOAD_MERCHANTS({ commit }) {
      axios.get(`${config.api}/public/merchant-programs`).then((response) => {
        commit('SET_MERCHANTS', { res: response.data });
      }, (err) => {
        console.error(err);
      });
    },
  },
  mutations: {
    SET_MERCHANTS(state, { res }) {
      state.programs = res[0].merchant_programs;
    },
  },
});

export default store;
