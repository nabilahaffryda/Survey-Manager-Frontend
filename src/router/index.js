import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'  
import Register from '../views/Register'
import Home from '../views/Home'
import Dashboard from '../views/Dashboard'
import store from "../store"
import route from 'vue-router'
import SurveyEditor from "../views/SurveyEditor"
import SurveyList from "../views/SurveyList"
// import SurveyResult from "../views/SurveyResult"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  { path: '/list', component: SurveyList, name: 'survey-list'},
  { path: '/:id', component: SurveyEditor, name: 'editor'},
  // { path: '/:id/results', component: SurveyResult, name: 'result'}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/' + SurveyConfig.admin_prefix + '/survey',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/dashboard");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router