import axios from 'axios';

const state = {
    user: null,
    // dashboard: null,
};
const getters = {
    isAuthenticated: state => !!state.user,    
    // StatePosts: state => state.posts,
    StateUser: state => state.user,
};
const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },
    async LogIn({commit}, User) {
        await axios.post('login', User)
        await commit('setUser', User.get('email'))
    },
    async LogOut({commit}){
        let user = null
        commit('logout', user)
    },      
};
const mutations = {
    setUser(state, email){
        state.user = email
    },
    // setPosts(state, posts){
    //     state.posts = posts
    // },
    logout(state, user) {
        state.user = user;
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};
