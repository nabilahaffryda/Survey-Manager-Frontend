import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './interceptor'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  data () {
    return {
      snackbar: false,
      snackbarMsg: ''
    }
  },
  render: h => h(App)
}).$mount('#app')
