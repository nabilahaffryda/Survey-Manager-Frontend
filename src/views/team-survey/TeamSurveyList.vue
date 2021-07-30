<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>List of all teams</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="teamsurvey"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:item="props">
                <tr>
                    <td class="text-sm-left">{{ props.item.name }}</td>
                    <td class="text-sm-left">{{ props.item.owner_id }}</td>
                    <td class="text-sm-left">{{ props.item.created_at}}</td>
                    <td class="justify layout px-0" >
                        <v-btn icon class="mx-0" @click="editItem(props.item.id)">
                            <v-icon color="amber">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                            <v-icon color="pink">mdi-delete</v-icon>
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
const data = {
    
}
export default {
    name: 'team-survey-list',
    data () {
        return {
            teamsurvey: [],
            page: 1,
            pageLength: 1,
            loading: false,
            headers: [
                {
                    text: 'Team Name',
                    value: 'name',
                    sortable: false
                },
                {
                    text: 'Owner Team',
                    // value: 'owner_id',
                    sortable: false
                },
                {
                    text: 'Created date',
                    value: 'created_at',
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
                    this.teamsurvey = response.data.data;
                    this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
                    this.loading = false;
                }
            })
            .catch((error) => {
                this.loading = false;
                // console.info(error.response);
                console.log(error.response);
            })
        },
        editItem(id) {
            this.$router.push({name: 'editor', params: {id: id}})
        },
        deleteItem(item) {
            if(confirm('Are you sure you want to delete this team?')) {
                this.snackbar = true;
                axios.delete('/team/' + item.id)
                    .then((response) => {
                        if(response.status === 200) {
                            this.$root.snackbarMsg = response.data.message;
                            this.$root.snackbar = true;
                        }
                    });
                const index = this.teamsurvey.indexOf(item);
                this.teamsurvey.splice(index, 1);
            }
        },
    }
}
</script>
<style>
    .remove-overflow {
        overflow: inherit;
    }
</style>