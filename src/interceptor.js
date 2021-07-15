import axios from "axios";
import store from "./store";

// apply interceptor on response
// axios.interceptors.response.use(function (response) {
//     if (response.status === 200 && response.data.message) {
//       console.success(response.data.message)
//     }
//     if (response.status === 201 && response.data.message) {
//       console.success(response.data.message)
//     }
//     return response
//   }, function (error) {
//     // Do something with response error
//     // check for errorHandle config
  
//     // if has response show the error
//     if (error.response) {
//       if (error.response.status === 404 || error.response.status === 400) {
//         console.error(error.response.data.message)
//       }
//       if (error.response.status === 401) {
//         // if you ever get an unauthorized, logout the user
//         store.dispatch('logout')
//       // you can also redirect to /login if needed !
//       }
//     }
//     return Promise.reject(error)
//   })
// // axios.interceptors.response.use(undefined, function (err) {
// //     return new Promise(function (resolve, reject) {
// //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
// //       // if you ever get an unauthorized, logout the user
// //         this.$store.dispatch(AUTH_LOGOUT)
// //       // you can also redirect to /login if needed !
// //       }
// //       throw err;
// //     });
// //   });
// axios.interceptors.request.use(request => {
//     const token = store.getters["user/token"];

//     if(token){
//         request.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//     return request;
// })
export default function execute() {
    axios.interceptors.request.use(function(config) {
        const token = this.$store.state.token;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}

