<template>
    <v-container>
        <v-toolbar>
            <v-toolbar-title>List of all available surveys</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog text v-model="dialog" max-width="500px" content-class="remove-overflow">
                <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on" dark class="mb-2">New Survey</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="editedItem.name"
                                            label="Survey name"
                                            :rules="[
                                            () => !!editedItem.name || 'The field name is required',
                                            () => !!editedItem.name && editedItem.name.length >= 3 || 'Name must contain at least 3 character!',
                                            ]"
                                    >
                                    </v-text-field>
                                    <v-checkbox v-model="checkbox" >
                                        <template v-slot:label>
                                            <div>Share with team?</div>
                                        </template>
                                    </v-checkbox>
                                    <v-select
                                        v-model="selectedItem"
                                        :headers="headers"
                                        :items="teams"
                                        item-value="team_id"
                                        item-text="team_name"
                                        label="Teams"
                                        name="selectedItem"

                                        dense
                                        filled
                                        outlined 
                                    > 
                                    <template v-slot:item="props"> 
                                        <v-list-item-content >
                                            {{ props.item.team_name }}
                                        </v-list-item-content>
                                    </template>
                                    <template v-slot:selection="props"> 
                                        {{ props.item.team_name }}
                                    </template>
                                    </v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1"  @click.native="onCloseModal">Cancel</v-btn> 
                        <v-btn color="blue darken-1"  @click.native="onSaveModal(editedItem.name, selectedItem)">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="surveys"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:item="props" >
                <tr>
                    <td class="text-sm-left">{{ props.item.name }}</td>
                    <td class="text-sm-left">{{ props.item.created_at}}</td>
                    <td class="justify layout px-0" >
                        <v-btn icon class="mx-0" @click="runSurvey(props.item.slug)">
                            <v-icon color="teal">mdi-play-circle-outline</v-icon>
                        </v-btn>
                        <v-btn icon class="mx-0" @click="showResults(props.item.id)">
                            <v-icon color="indigo">mdi-forum</v-icon>
                        </v-btn>
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
                <v-btn color="primary" @click="getSurveys">Reset</v-btn>
            </template>
        </v-data-table>
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title>Delete</v-card-title>
                      <v-card-text>Are you want to delete `{{props.item.name}}` ?</v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
                        <v-btn color="primary" text @click="deleteItem(props.item)">Delete</v-btn>
                      </v-card-actions>
                    </v-card>
                </v-dialog> -->
        <div class="text-xs-center pt-2">
            <v-pagination v-model="page" :length="pageLength" :total-visible="7"></v-pagination>
        </div>
    </v-container>
</template>

<script>
import SurveyConfigVue from "./SurveyConfig.vue"
import axios from 'axios'
    export default {
        name: 'survey-list',
        data () {
            return {
                surveys: [],
                teams: [],
                page: 1,
                pageLength: 1,
                dialog: false,
                loading: false,
                checkbox: false,
                selectedItem: '',
                formTitle: 'New Survey',
                headers: [
                    {
                        text: 'Name',
                        value: 'name',
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
                    },
                    {
                        value: 'team_name',
                    },
                ],
                editedItem: {
                    name: ''
                },

            }
        },
        mounted() {
            this.getSurveys();
            this.getTeams();
        },
        watch: {
            page() {
                this.getSurveys();
                this.getTeams();
            }
        },
        methods: {
            getSurveys() {
                this.loading = true;
                axios.get('/survey/', {
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
                        this.surveys = response.data.data;
                        this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
                        this.loading = false;
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    console.info(error.response);
                })
            },
            getTeams() {
                this.loading = true;
                axios.get('/ownedTeam/', {
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
            editItem(id) {
                this.$router.push({name: 'editor', params: {id: id}})
            },
            deleteItem(item) {
                if(confirm('Are you sure you want to delete this survey?')) {
                    this.snackbar = true;
                    axios.delete('/survey/' + item.id)
                        .then((response) => {
                            if(response.status === 200) {
                                this.$root.snackbarMsg = response.data.message;
                                this.$root.snackbar = true;
                            }
                        });
                    const index = this.surveys.indexOf(item);
                    this.surveys.splice(index, 1);
                }
            },
            onCloseModal() {
                this.dialog = false;
                this.editedItem = Object.assign({}, {name: ''})
            },
            onSaveModal(name, selectedItem) {
                this.loading = true;
                let data = {
                    name: name,
                    
                    team_name: selectedItem,
                    json: {
                        pages: []
                    }
                };
                axios.post('/survey', data)
                    .then((response) => {
                        if(response.status === 201) {
                            this.dialog = false;
                            this.loading = false;
                            this.$root.snackbarMsg = response.data.message;
                            this.$root.snackbar = true;
                            this.editedItem = Object.assign({}, {name: '', selectedItem: ''});
                            this.getSurveys();
                        }
                    })
            },
            runSurvey(slug) {
                window.open('/' + SurveyConfigVue + '/' + slug, '_blank');
            },
            showResults(id) {
                this.$router.push({name: 'result', params: {id: id} })
            }
        }
    }
</script>

<style>
    .remove-overflow {
        overflow: inherit;
    }
</style>