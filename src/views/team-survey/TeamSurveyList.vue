<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>List of all teams</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="teams"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:item="props">
                <tr>
                    <td class="text-sm-left">{{ props.item.team_name }}</td>
                    <td class="text-sm-left">{{ props.item.team_owner }}</td>
                    <td class="justify layout px-0" >
                        <v-btn icon class="mx-0" @click="ViewSurvey(props.item.id)">
                            <v-icon color="amber">mdi-file-multiple</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="getTeamSurvey">Reset</v-btn>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="page" :length="pageLength" :total-visible="7"></v-pagination>
        </div>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: 'team-survey-list',
    data () {
        return {
            teams: [
                {
                    id: ''
                }
            ],
            page: 1,
            pageLength: 1,
            loading: false,
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
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                }
            ],
        }
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
        getTeamSurvey() {
            this.loading = true;
            axios.get('/team/', {
                params: {
                    id : this.teams.id,
                    page: this.page
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
                    this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
                    this.loading = false;
                }
            })
            .catch((error) => {
                this.loading = false;
                console.info(error.response);
            })
        },
        ViewSurvey(id) {
            this.$router.push({name: 'list-survey', params: {id: id}})
        },
        
    }
}
</script>
<style>
    .remove-overflow {
        overflow: inherit;
    }
</style>