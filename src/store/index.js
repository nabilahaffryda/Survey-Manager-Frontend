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
  plugins: [createPersistedState()],
  // state: {
  //   msg: 'Vuetify table of Vuex state items.',
  //   headers: [
  //     {
  //       text: 'Code',
  //       align: 'left',
  //       sortable: true,
  //       value: 'code'
  //     },

  //     // { text: 'Name', value: 'name' },
  //     // { text: 'Description', value: 'description' },

  //     { text: 'Actions', value: 'action', sortable: false }
  //   ],
  // }

});
