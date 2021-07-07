import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import store from './store'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.config.productionTip = false

// axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
  
//         originalRequest._retry = true;
//         store.dispatch('LogOut')
//         return router.push('/login')
//     }
//   }
// })

// axios.interceptors.request.use(request => {
//     const token = store.getters["user/token"];

//     if(token){
//         request.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//     return request;
// })

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
