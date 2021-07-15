import axios from 'axios';

const state = {
    user: null,
    dashboard: null,
};

const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
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
                    "Content-Type": "application/json"
                }
            }
        )
        await commit('setUser', User.get('email'))
    },
    async LogOut({commit}, user){
        // axios.post('logout').then(response => {
        //     if (response.status === 302 || 401) {
        //         console.log('logout')
        //     }
        //     else {
        //         // throw error and go to catch block
        //     }
        // }).catch(error => {
        //     //run this code always when status!==200
        // });
        // axios.post('logout', user, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // axios({
        //     method: 'post',
        //     url: 'logout',
        //     // data: bodyFormData,
        //     headers: {'Content-Type': 'application/json' }
        //     })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });
        // const options = {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     url: 'logout'
        //   };
        // axios(options);
        // let user = null
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
};
export default {
  state,
  getters,
  actions,
  mutations
};
