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

                <v-menu  :close-on-content-click="true" nudge-left="60" nudge-bottom="57" transition="slide-y-transition" float-left class="ma-2">
                    <template v-slot:activator="{ on, attrs }">
                        <v-badge  overlap offset-y="23px" offset-x="17px" color="white">
                            <v-btn id="notifbtn" icon :color="buttonColor" v-bind="attrs" v-on="on">
                                <v-icon>mdi-bell</v-icon>
                            </v-btn>
                        </v-badge>
                    </template>
                    <v-card max-width="350" color="white" class="text-center">
                        <v-container fill-height >
                            <v-row no-gutters >
                                <v-col cols="12" style="max-height: 150px" class="overflow-y-auto">
                                    <v-data-table :items="teams" :headers="headers" :hide-default-header="true" :hide-default-footer="true" disable-pagination>
                                    <template v-slot:item="props">
                                        <v-list >
                                            <v-list-item-content class="text-center">
                                                <v-list-item-title>You've been invited to {{ props.item.team_name }} team!</v-list-item-title>
                                                <v-list-item-subtitle>Team Owner is {{ props.item.team_owner }}</v-list-item-subtitle>
                                                <spacer/>
                                                <v-btn :style="{left: '50%', transform:'translateX(-50%)'}" max-width="200" color="success" type="button" @click="acceptInvitation(props.item)" >
                                                    Accept Invitation
                                                </v-btn>
                                            </v-list-item-content>
                                        </v-list>
                                        <v-divider/>
                                    </template>
                                    </v-data-table>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col col="3" class="text-center">
                                    <router-link to="notifications">
                                        <v-btn small :color="buttonColor"> 
                                            View all notifications 
                                        </v-btn>
                                    </router-link>
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
import axios from 'axios'
import { mapGetters} from "vuex";
export default {
    name: 'Header',
    data() {
        return {
            links: [
                {text: 'Team Member', route: 'teammemberlist'},
                {text: 'Team Survey', route: 'teamsurveylist'},
            ],
            profile: [
            ],
            teams: [
                {
                    id: ''
                }
            ],
            headers: [
                {
                    text: 'Team Name',
                    value: 'team_name',
                    sortable: false
                },
                {
                    text: 'Owner Team',
                    value: 'team_owner',
                    sortable: false
                },
            ],
        }
    },
    props: ["buttonColor"],
    computed: {
        isLoggedIn: function() {
            return this.$store.getters.isAuthenticated;
        },
        ...mapGetters({User: "StateUser"}),
    },
    mounted() {
        this.getTeamSurvey();
    },
    watch: {
        page() {
            this.getTeamSurvey();
        }
    },
    methods: {
        acceptInvitation(props){
            axios.post(`/team/acceptInvitation/${props.invitation_key}`,
            {
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token'),
                    "Accept": "application/json",
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 201){
                    this.$root.snackbarMsg = response.data.message;
                    this.$root.snackbar = true;
                    this.$router.push('/surveylist');
                }
            })
        },
        getTeamSurvey() {
            axios.get('/team/pendingInvitations/', {
                params: {
                    id : this.teams.id,
                },
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token'),
                    "Accept": "application/json",
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.status === 200) {
                    this.teams = response.data.data;
                    this.notif = response.data.data;
                }
            })
            .catch((error) => {
                console.info(error.response);
            })
        },
        async logout() {
            await this.$store.dispatch("logout");
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
    },
}
</script>