// // const { SurveyConfig } = require("survey-vue");
// window.axios = require("axios");

// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// // window.axios.defaults.baseURL = '/' + SurveyConfig.api_prefix;
// window.axios.defaults.baseURL = 'http://localhost:8080/' + SurveyConfig.api_prefix;
// // window.axios.defaults.baseURL = 'http://localhost:8080/';
// window.axios.defaults.withCredentials = true;
// // axios.defaults.withCredentials = true
// // axios.defaults.baseURL = 'http://localhost:8080/';

// let token = document.head.querySelector("meta[name=\"csrf-token\"]");

// if (token) {
//     window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
// }
// else{
//     console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"); //eslint-disable-line
// }