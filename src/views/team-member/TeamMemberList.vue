<template>
    <v-container>   
        <v-toolbar
            flat
        >
            <v-toolbar-title>List of teams</v-toolbar-title>
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
                New Team
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
                        v-model="editedItem.team_name"
                        label="Team name"
                        :rules="[
                            () => !!editedItem.team_name || 'The field name is required',
                            () => !!editedItem.team_name && editedItem.team_name.length >= 3 || 'Name must contain at least 3 character!',
                        ]"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save(editedItem.team_name)"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            
            <v-dialog v-model="dialogDelete" max-width="450px" activator="item">
                
            <v-card >
                <!-- <template v-slot:item="item"> -->
                <v-card-title class="text">Are you sure you want to delete this team?</v-card-title>
                <!-- <span>Current member: {{item.membership}}</span>
                <span>Total Survey: {{item.survey_number}}</span> -->
                <!-- <v-card-text class="pa-4">Current member: {{ item.membership }}</v-card-text>
                <v-card-text class="pa-4">Total Survey: {{ item.survey_number }}</v-card-text> -->
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
                <!-- </template> -->
            </v-card>
             
            </v-dialog>
           
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="teams"
            class="elevation-1"
        >
        <template v-slot:item="props">
            <tr>
                <td class="text-sm-left">{{ props.item.team_name }}</td>
                <td class="text-sm-left">{{ props.item.created_at}}</td>
                <td class="justify layout px-0" >
                    <v-btn icon class="mx-0" @click="viewMember(props.item.id)">
                        <v-icon color="blue">mdi-account-edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
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
            @click="getTeams"
        >
            Reset
        </v-btn>
        </template>
    </v-data-table>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: 'team-member-list',
    data () {
        return {
            teams: [
                {
                    id: ''
                }
            ],
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Name',
                    value: 'team_name',
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
            editedItem: {
                team_name: '',
            },
            editedIndex: -1,
            defaultItem: {
                team_name: '',
            },
        }
    },
    mounted() {
        this.getTeams();
    },
    created () {
      this.getTeams();
    },
    watch: {
        page() {
            this.getTeams();
        },
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.close()
        },
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    methods: {
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
        viewMember(id) {
            this.$router.push({name: 'member-list', params: {id: id}})
        },
        save (team_name) {
            if (this.editedIndex > -1) {
                console.log('edited data');
                console.log(this.editedItem);
                axios.put('/team/' + this.editedItem.id,
                {
                    team_name:this.editedItem.team_name
                }
                )
                .then((response) => {
                    if(response.status === 201) {
                        this.$root.snackbarMsg = response.data.message;
                        this.$root.snackbar = true;
                        Object.assign(this.teams[this.editedIndex], this.editedItem)
                        this.getTeams();
                    }
                })
            } else {
                let data = {
                    team_name: team_name,
                };
                console.log('created data');
                console.log(this.editedItem);
                axios.post('/team/', data)
                .then((response) => {
                    if(response.status === 201) {
                        this.$root.snackbarMsg = response.data.message;
                        this.$root.snackbar = true;
                        this.editedItem = Object.assign({}, {team_name: ''});
                        this.getTeams();
                    }
                })
                this.teams.push(this.editedItem)
            }
            this.close()
        },
        close () {
            this.dialog = false
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        editItem (item) {
            this.editedIndex = this.teams.indexOf(item)
            this.editedItem = Object.assign({}, item)
            console.log(this.editedItem)
            this.dialog = true
        },
        deleteItem (item) {
            this.editedIndex = this.teams.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            
        },
        deleteItemConfirm () {
            axios.delete('/team/' + this.editedItem.id)
                .then((response) => {
                    if(response.status === 200) {
                        this.$root.snackbarMsg = response.data.message;
                        this.$root.snackbar = true;
                        this.teams.splice(this.editedIndex, 1)
                    }else if (response.status === 405){
                        this.$root.snackbarMsg = response.data.message;
                        this.$root.snackbar = false;
                    }
                });
            
            this.close()
        },
    }
}
</script>
<style>
    .remove-overflow {
        overflow: inherit;
    }
</style>