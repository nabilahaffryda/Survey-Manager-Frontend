import api from './api'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import './interceptor'
// import createPersistedState from "vuex-persistedstate";
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
// import { config } from 'vue/types/umd'
// import { response } from 'express'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.config.productionTip = false

// Vue.prototype.$http = axios;
//       const token = localStorage.getItem('token');
//       if (token) {
//         Vue.prototype.$http.defaults.headers.common['Authorization'] = token
//       }
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/';

// axios.interceptors.response.use(undefined, function(error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       store.dispatch("LogOut");
//       // return router.push("/login");
//     }
//   }
// });
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// window.axios.defaults.baseURL = 'http://localhost:8080/';
// window.axios.defaults.withCredentials = true;
// let token = document.head.querySelector("meta[name=\"csrf-token\"]");

// if (token) {
//     window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
// }
// else{
//     console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"); //eslint-disable-line
// }

// Vue.prototype.$http = api;
// api.defaults.timeout = 10000;

// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("access_token");
//     if(token){
//       config.headers.common["Authorization"] = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   response => {
//     if(response.status === 200 || response.status === 201){
//       return Promise.resolve(response);
//     }else{
//       return Promise.reject(response);
//     }
//   },
//   error => {
//     if(error.response.status){
//       switch(error.response.status){
//         case 400:
//           break;
//         case 401:
//           alert("session expired");
//           break;
//         case 403:
//           router.replace({
//             path: "/login",
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           });
//           break;
//         case 404:
//           alert('page not exist');
//           break;
//         case 502: 
//           setTimeout(() => {
//             router.replace({
//               path: "/login",
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//       }
//       return Promise.reject(error.response);
//     }
//   }
// );
// Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     userlogged: "Logged user"
//   },
//   mutations: {
//     saveUserLogged(state, loggedUser) {
//       state.userlogged = loggedUser;
//     }
//   },
//   actions: {
//     saveUserLogged(context, loggedUser) {
//       context.commit("saveUserLogged", loggedUser);
//     }
//   },
//   plugins: [createPersistedState()]
// });
new Vue({
  vuetify,
  router,
  store,
  // data () {
  //   return {
  //     snackbar: false,
  //     snackbarMsg: ''
  //   }
  // },
  render: h => h(App)
}).$mount('#app')
