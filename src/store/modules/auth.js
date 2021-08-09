import axios from 'axios';

const state = {
    user: null,
    dashboard: null,
    // notifications: [
	// 	{
	// 		avatar: null,
	// 		//'https://banner2.cleanpng.com/20180820/iyz/kisspng-computer-icons-vector-graphics-image-icon-design-i-flat-delete-icon-bing-images-5b7b43bfdfb3e4.1170827415348049279163.jpg',
	// 		title: 'Server error',
	// 		subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be a hero and fix this bug team member`,
	// 		divider: true,
	// 		inset: true,
	// 		icon: 'mdi-close-circle',
	// 	},
	// 	{
	// 		avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
	// 		title: 'Summer BBQ <span class="grey--text text--lighten-1">@4</span>',
	// 		subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
	// 		divider: true,
	// 		inset: true,
	// 	},
	// 	{
	// 		avatar: null,
	// 		title: 'Reminder: Meeting with person in 30 mins',
	// 		subtitle:
	// 			'<span class="font-weight-bold">Sandra Adams</span> &mdash; You have an very important meeting thats important.',
	// 		divider: true,
	// 		inset: true,
	// 		icon: 'mdi-chat-alert',
	// 	},
	// ],
    currentTime: new Date().toLocaleString(),
};
const lc = window.localStorage;
const TOKEN = "token";

const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
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
