<template>
    <v-container  >
        <v-layout wrap style="margin-top: 80px;">
             <v-flex sm12 md6 offset-md3>
                <v-card :items="teams" :headers="headers"> 
                    <template v-slot:item="props">
                    <v-col md="12" >
                        <h2 class="text-center">
                            You've been invited to {{ props.item.team_name }} team!
                        </h2>
                        <span>Team Owner is {{ props.item.team_owner }}</span>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col md="12">
                    <form>
                        <v-col md="12">
                            <v-row>
                                <v-col md="6">
                                    <v-btn color="success" type="button" @click="acceptInvitation()" >
                                        Accept Invitation
                                    </v-btn>
                                </v-col>
                                <v-col md="6">
                                    <v-btn type="button">
                                        Decline
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </form>
                    </v-col>
                    </template>
                </v-card>
             </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: 'detail-invitation',
    data(){
        return{
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
    methods: {
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
                }
            })
            .catch((error) => {
                console.info(error.response);
            })
        },
        acceptInvitation(){
            axios.get(`/team/acceptInvitation/${this.$route.params.id}`,
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
        }
    },
}
</script>