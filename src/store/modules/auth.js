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
    logout({commit}, user) {
        if(confirm("Are you sure you want to log out?")) {
            axios.post('/logout/').then(response => {
             localStorage.removeItem('token');
   
             // remove any other authenticated user data you put in local storage
   
             // Assuming that you set this earlier for subsequent Ajax request at some point like so:
             // axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth_token ;
             delete axios.defaults.headers.common['Authorization'];
             commit('logout', user)
             // If using 'vue-router' redirect to login page
             this.$router.push("/login");
           })
           .catch(error => {
             // If the api request failed then you still might want to remove
             // the same data from localStorage anyways
             // perhaps this code should go in a finally method instead of then and catch
             // methods to avoid duplication.
             localStorage.removeItem('token');
             delete axios.defaults.headers.common['Authorization'];
             this.$router.push("/login");
           });       
          }
        }
    }   
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
