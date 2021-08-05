import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/authentication/Login'  
import Register from '../views/authentication/Register'
import Home from '../views/Home'
import store from "../store"
import SurveyEditor from "../views/survey/SurveyEditor"
import SurveyList from "../views/survey/SurveyList"
// import SurveyResult from "../views/SurveyResult
import TeamMemberList from "../views/team-member/TeamMemberList"
import TeamSurveyList from "../views/team-survey/TeamSurveyList"
import MemberList from "../views/team-member/MemberList"
import ListSurvey from "../views/team-survey/ListSurvey"

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
    path: '/surveylist/:id', 
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
    path: '/teammemberlist', 
    component: TeamMemberList, 
    name: 'team-member-list',
  },
  { 
    path: '/teamsurveylist', 
    component: TeamSurveyList, 
    name: 'team-survey-list',
  },
  { 
    path: '/memberlist/:id', 
    component: MemberList, 
    name: 'member-list',
  },
  { 
    path: '/listsurvey/:id', 
    component: ListSurvey, 
    name: 'list-survey',
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
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router