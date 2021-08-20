import axios from "axios";
import Vue from 'vue'

Vue.prototype.$http = axios;
axios.defaults.timeout = 10000;
axios.defaults.baseURL = "http://localhost:8080/";
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // TODO: check if have any lang saved in localStorage, if not browser lang or default
    config.headers['Accept-Language'] = 'en'
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
  
//         originalRequest._retry = true;
//         store.dispatch('logout')
//         return router.push('/login')
//     }
//   }
// })


axios.interceptors.response.use(
  response => {
    if(response.status === 200 || response.status === 201){
      return Promise.resolve(response);
    }else{
      return Promise.reject(response);
    }
  },
  error => {
    if(error.response.status){
      switch(error.response.status){
        case 400:
          break;
        case 401:
          // alert("session expired");
          // break;
        case 403:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          alert('page not exist');
          break;
        case 502: 
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);