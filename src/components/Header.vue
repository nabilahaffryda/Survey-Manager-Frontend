<template>
    <v-container>
        <v-toolbar flat color="primary" dark>
            <v-toolbar-title >
                    Survey Manager
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items v-if="isLoggedIn">
                <v-btn text @click="redirectSurvey()">
                   Survey
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text color="white">
                            <span>Team</span>
                            <v-icon right>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                            <v-list-item-title>{{ link.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu offset-y
                    :close-on-content-click="true"
                    nudge-left="60"
                    nudge-bottom="57"
                    transition="slide-y-transition"
                    float-left
                    class="ma-2">
                    <template v-slot:activator="{ on, attrs }">
                        <v-badge 
                        :content="getNotificationAmt"
                        :value="badgeShow"
                        overlap
                        offset-y="23px"
                        offset-x="17px"
                        color="white">
                            <v-btn 
                            id="notifbtn"
                            icon
                            :color="buttonColor"
                            v-bind="attrs"
                            v-on="on">
                            <v-icon>mdi-bell</v-icon>
                            </v-btn>
                        </v-badge>
                    </template>
                    <v-card max-width="400" color="primary">
                        <v-container fill-height>
                            <v-row no-gutters>
                                <v-col cols="7" class="mx-auto ">
                                    <v-subheader
                                        v-if="getNotifHeader"
                                        class="d-flex justify-center pa-2 secondary--text "
                                    >
                                        Refreshed: {{ notificationHeader }}
                                    </v-subheader>
                                </v-col>
                                <v-col cols="12">
                                    <template v-for="(value, index) in getNotifications">
                                        <v-divider v-if="value.divider" :key="index" />
                                        <v-list-item :key="value.title" two-line to="Notifications">
                                            <v-list-item-avatar :key="value.avatar">
                                                <img v-if="value.avatar" :src="value.avatar" />
                                                <v-icon v-if="value.icon" large color="secondary">{{value.icon}}</v-icon>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="value.title" />
                                                <v-list-item-subtitle v-html="value.subtitle" />
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-col>
                            </v-row>
                            <v-row><v-divider class="mb-1 px-2" /></v-row>
                            <v-row>
                                <v-col col="3" class="text-center">
                                    <router-link to="notifications">
                                        <v-btn small :color="buttonColor"> View all notifications </v-btn>
                                    </router-link>
                                </v-col>
                                <v-col col="3" class="text-center">
                                    <v-btn small @click="clearNotifs" :color="buttonColor"
                                        >Clear Notifications</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-menu>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text color="white">
                            <span>{{User}}</span>
                            <v-icon right>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="link in profile" :key="link.text" router :to="link.route">
                            <v-list-item-title>{{ link.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn text @click="logout()">
                    <span>Logout</span>
                    <v-icon right>mdi-logout</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items v-else>
                <v-btn text @click="redirectLogin()">
                    Login
                </v-btn>
                <v-btn text @click="redirectRegister()">
                    Register
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>
<script>
import { mapGetters , mapMutations} from "vuex";
export default {
    name: 'Header',
    data() {
        return {
            links: [
                {icon: 'team', text: 'Team Member', route: 'teammemberlist'},
                {icon: 'team', text: 'Team Survey', route: 'teamsurveylist'},
            ],
            profile: [
                {icon: 'mdi-logout', text: 'Logout', route: 'login'},
            ],
            notificationLimit: 5, //use in for loop
			notifHeader: null,
			badgeShow: true,
        }
    },
    props: ["buttonColor"],
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
        ...mapGetters({ User: "StateUser", Notifications: "getNotifications", NotifHeader: "getNotifHeader",  NotificationAmt: "getNotificationAmt"}),
        notificationHeader: function () {
			// waits for update on state and updates header from state
			return this.getNotifHeader;
		},
		...mapMutations(["clearNotifications"]),
    },
    methods: {
        async logout() {
            await this.$store.dispatch("LogOut");
            this.$router.push("/login");
        },
        redirectLogin(){
            this.$router.push('/login')
        },
        redirectRegister(){
            this.$router.push('/register')
        },
        redirectSurvey(){
            this.$router.push('/surveylist')
        },
        clearNotifs: function () {
			this.clearNotifications;
			this.badgeShow = false;
		},
    },
}
</script>