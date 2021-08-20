import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';

// Load Vuex
Vue.use(Vuex);
// Create store

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    userlogged: ''
  },
  mutations: {
    saveUserLogged (state, loggedUser) {
      state.userLogged = loggedUser
    }
  },
  actions: {
    saveUserLogged (context, loggedUser) {
      context.commit('saveUserLogged', loggedUser)
    }
  },
  // state: {},
  // mutations: {},
  // actions: {},
  // getters: {},
  plugins: [createPersistedState()]
});
