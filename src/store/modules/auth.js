import axios from 'axios';

const state = {
    user: null,
    dashboard: null,
};
const lc = window.localStorage;
const TOKEN = "token";

const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
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
        this.checkQuery;
        console.log(this.Register)
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
    async logout({commit}, user) {
        if(confirm("Are you sure you want to log out?")) {
            axios.post('/logout/').then(response => {
             localStorage.removeItem('token');
             delete axios.defaults.headers.common['Authorization'];
             commit('logout', user);
             this.$router.push("/login");
           })
           .catch(error => {
             localStorage.removeItem('token');
             delete axios.defaults.headers.common['Authorization'];
             this.$router.push("/login");
           });       
        }
    },
    checkQuery(){
        if(this.$route.query.email){
            this.verification_code = this.query.email;
            window.history.replaceState({}, document.title, "/verification");
            this.$nextTick(()=> {
                this.verify();
            })
        }else{
            this.verification_code = null;
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
};
export default {
  state,
  getters,
  actions,
  mutations,
};
