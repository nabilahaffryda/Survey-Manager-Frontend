import axios from 'axios';

const state = {
    user: null,
    dashboard: null,
    currentTime: new Date().toLocaleString(),
};
const lc = window.localStorage;
const TOKEN = "token";

const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    // StateTeam: state => state.teams,
    getNotifications: state => state.notifications,
    getNotifHeader: state => state.currentTime,
    getNotificationAmt: state => state.notifications.length,
};

const actions = {

    async Register({dispatch}, form) {
        await axios.post('/register', form, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
    },
    async LogIn({commit}, User) {
        await axios.post('/login', User,
            {
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token'),
                    "Accept": "application/json",
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }
            }
        )
        .then(res => {
            lc.setItem(TOKEN, res.data.success.token);
        })
        await commit('setUser', User.get('email'))
    },
    async LogOut({commit}, user){
        
        commit('logout', user)
    },      
};
const mutations = {
    setUser(state, email){
        state.user = email
    },
    logout(state, user) {
        state.user = user;
    },
    clearNotifications(state){
        state.notifications = 0
    }
};
export default {
  state,
  getters,
  actions,
  mutations,
};
