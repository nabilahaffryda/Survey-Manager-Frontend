<template>
    <v-container>   
        <v-toolbar
            flat
        >
            <v-toolbar-title>List of surveys</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >
                New Survey
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                    > 
                        <v-text-field
                            v-model="editedItem.name"
                            label="Survey name"
                            name="name"
                            :rules="[
                                () => !!editedItem.name || 'The field name is required',
                                () => !!editedItem.name && editedItem.name.length >= 3 || 'Name must contain at least 3 character!',
                            ]"
                        ></v-text-field>
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
                            dense filled outlined 
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
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click.native="onCloseModal"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                   @click.native="onSaveModal(editedItem.name, selectedItem)"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            
            <v-dialog v-model="dialogDelete" max-width="500px" activator="item">
            <v-card >
                <v-card-title class="text">Are you sure you want to delete this survey?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="onCloseModal">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
           
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="surveys"
            class="elevation-1"
        >
        <template v-slot:item="props">
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
        <template v-slot:no-data>
        <v-btn
            color="primary"
            @click="getSurveys"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>
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
                dialog: false,
                checkbox: false,
                dialogDelete: false,
                formTitle: 'New Survey',
                selectedItem: '',
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
                ],
                editedItem: {
                    name: '',
                },
                editedIndex: -1,
                defaultItem: {
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
            },
            dialog (val) {
                val || this.onCloseModal()
            },
            dialogDelete (val) {
                val || this.onCloseModal()
            },
        },
        methods: {
            getSurveys() {
                axios.get('/survey/', {
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
                    }
                })
                .catch((error) => {
                    console.info(error.response);
                })
            },
            getTeams() {
                axios.get('/ownedTeam/', {
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
            editItem(id) {
                this.$router.push({name: 'editor', params: {id: id}})
            },
            deleteItem(item) {
                this.editedIndex = this.teams.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm () {
                axios.delete('/survey/' + this.editedItem.id)
                    .then((response) => {
                        if(response.status === 200) {
                            this.$root.snackbarMsg = response.data.message;
                            this.$root.snackbar = true;
                        }
                    });
                this.teams.splice(this.editedIndex, 1)
                this.onCloseModal()
            },
            onCloseModal() {
                this.dialog = false;
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            onSaveModal(name, selectedItem) {
                let data = {
                    name: name,
                    team_name: selectedItem,
                };
                console.log('created data');
                console.log(this.editedItem);
                axios.post('/survey/', data)
                    .then((response) => {
                        if(response.status === 201) {
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