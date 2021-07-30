import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/authentication/Login'  
import Register from '../views/authentication/Register'
import Home from '../views/Home'
import store from "../store"
import SurveyEditor from "../views/survey/SurveyEditor"
import SurveyList from "../views/survey/SurveyList"
// import SurveyResult from "../views/SurveyResult
import TeamList from "../views/team/TeamList"

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
    path: '/surveylist', 
    component: SurveyList, 
    name: 'survey-list', 
    meta: { requiresAuth: true },
  },
  { 
    path: '/:id', 
    component: SurveyEditor, 
    name: 'editor',
    meta: { requiresAuth: true },
  },
  // { 
  //   path: '/:id/results', 
  //   component: SurveyResult, 
  //   name: 'result'
  // },
  { 
    path: '/teamlist', 
    component: TeamList, 
    name: 'team-list',
  },
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
      next("/surveylist");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router