import axios from "axios";
import api from './api'
import Vue from 'vue'

Vue.prototype.$http = axios;
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if(token){
      config.headers.common["Authorization"] = token;
      // axios.defaults.headers.common['Authorization'] =Bearer ${token}
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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
        // case 401:
        //   alert("session expired");
        //   break;
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
// createAxiosResponseInterceptor() {
//   this.axiosResponseInterceptor = window.axios.interceptors.response.use(
//       response => {
//           return response;
//       },
//       error => {
//           let errorResponse = error.response;
//           if (errorResponse.status === 401) {
//               window.axios.interceptors.response.eject(this.axiosResponseInterceptor);
//               return window.axios.post('/api/refresh_token', {
//                   'refresh_token': this._getToken('refresh_token'),
//               }).then(response => {
//                   this.setToken(response.data.access_token, response.data.refresh_token);
//                   errorResponse.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
//                   this.createAxiosResponseInterceptor();
//                   return window.axios(errorResponse.config);
//               }).catch(error => {
//                   this.destroyToken();
//                   this.createAxiosResponseInterceptor();
//                   this.router.push('/login');
//                   return Promise.reject(error);
//               });
//           }
//           return Promise.reject(error);
//       }
//   );
// }
// // // const instance = axios.create({
// // //     baseURL: "http://localhost:8080/"
// // //   });
  
// //   // interceptors
// //  axios.interceptors.request.use((config) => {
// //       let token = localStorage.getItem('token');
    
// //       let headers = { 'Authorization': token };
// //       config.headers = Object.assign({} , config.headers, headers);
// //     // console.log("hello")
// //       return config;
// //     }, (err) => {
// //       return Promise.reject(err);
// //     });
  
// //   // export default instance

// // // apply interceptor on response
// // // axios.interceptors.response.use(function (response) {
// // //     if (response.status === 200 && response.data.message) {
// // //       console.success(response.data.message)
// // //     }
// // //     if (response.status === 201 && response.data.message) {
// // //       console.success(response.data.message)
// // //     }
// // //     return response
// // //   }, function (error) {
// // //     // Do something with response error
// // //     // check for errorHandle config
  
// // //     // if has response show the error
// // //     if (error.response) {
// // //       if (error.response.status === 404 || error.response.status === 400) {
// // //         console.error(error.response.data.message)
// // //       }
// // //       if (error.response.status === 401) {
// // //         // if you ever get an unauthorized, logout the user
// // //         store.dispatch('logout')
// // //       // you can also redirect to /login if needed !
// // //       }
// // //     }
// // //     return Promise.reject(error)
// // //   })
// // // // axios.interceptors.response.use(undefined, function (err) {
// // // //     return new Promise(function (resolve, reject) {
// // // //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
// // // //       // if you ever get an unauthorized, logout the user
// // // //         this.$store.dispatch(AUTH_LOGOUT)
// // // //       // you can also redirect to /login if needed !
// // // //       }
// // // //       throw err;
// // // //     });
// // // //   });
// // // axios.interceptors.request.use(request => {
// // //     const token = store.getters["user/token"];

// // //     if(token){
// // //         request.headers.common["Authorization"] = `Bearer ${token}`;
// // //     }
// // //     return request;
// // // })
// // // export default function execute() {
// // //     axios.interceptors.request.use(function(config) {
// // //         const token = localStorage.getItem('token');
// // //         if(token) {
// // //             // config.headers.Authorization = `Bearer ${token}`;
// // //             config.headers.Authorization =  token ? `Bearer ${token}` : '';
// // //             // console.log("hello")
// // //         }
// // //         return config;
// // //     }, function(err) {
// // //         return Promise.reject(err);
// // //     });
// // // } 
// // // Vue.http.interceptors.push(function (request, next) {
// // //     request.headers['X-CSRF-TOKEN'] = Laravel.csrfToken;
// // //     next();
// // //     });
// // // }
