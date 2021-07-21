import axios from 'axios';

const state = {
    // refresh_token: "",
    // access_token: "",
    // loggedInUser: {},
    // isAuthenticated: false,
    user: null,
    dashboard: null,
    // user_id: null
};
const lc = window.localStorage;
const TOKEN = "token";
const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
    // loggedInUser: state => state.loggedInUser,
    // isAuthenticated: state => state.isAuthenticated,
    // accessToken: state => state.access_token,
    // refreshToken: state => state.refresh_token
};

const actions = {

    async Register({dispatch}, form) {
        // await axios.post('register', form)
        await axios.post('/register', form, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        // await dispatch('LogIn', UserForm) 
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
    // async getSurveys({dispatch}, User){
    //     axios.get('/survey', {
    //                 params: {
    //                     page: this.page
    //                 },
    //                 headers: {
    //                     "Authorization": "bearer " + localStorage.getItem('token'),
    //                     "Accept": "application/json",
    //                     "cache-control": "no-cache"
    //                 }
    //             })
    //                 .then((response) => {
    //                     if(response.status === 200) {
    //                         this.surveys = response.data.data;
    //                         this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
    //                         this.loading = false;
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     this.loading = false;
    //                     console.info(error.response);
    //                 })
    // }
};
const mutations = {
    setUser(state, email){
        state.user = email
    },
    logout(state, user) {
        state.user = user;
    },
    // setRefreshToken: function(state, refreshToken) {
    //     state.refresh_token = refreshToken;
    //   },
    //   setAccessToken: function(state, accessToken) {
    //     state.access_token = accessToken;
    //   },
    //   // sets state with user information and toggles 
    //   // isAuthenticated from false to true
    //   setLoggedInUser: function(state, user) {
    //     state.loggedInUser = user;
    //     state.isAuthenticated = true;
    //   },
    //   // delete all auth and user information from the state
    //   clearUserData: function(state) {
    //     state.refresh_token = "";
    //     state.access_token = "";
    //     state.loggedInUser = {};
    //     state.isAuthenticated = false;
    //   }
};
export default {
  state,
  getters,
  actions,
  mutations
};
