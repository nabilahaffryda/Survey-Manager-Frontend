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
                <v-btn text @click="redirectTeam()">
                   Team
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" text color="white">
                            <span>{{User}}</span>
                            <v-icon right>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
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
import { mapGetters } from "vuex";
export default {
    name: 'Header',
    data() {
        return {
            links: [
                // {icon: 'survey', text: 'Survey', route: '/surveylist'},
            ],
        }
    },
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
        ...mapGetters({ Posts: "StatePosts", User: "StateUser" }),
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
        redirectTeam(){
            this.$router.push({name: 'team-list'})
        }
    },
}
</script>