<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>List of all member</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog text v-model="dialog" max-width="500px" content-class="remove-overflow">
                <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on" dark class="mb-2">New Member</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-row>
                                <v-col
                                    cols="12"
                                > 
                                    <v-text-field
                                            v-model="editedItem.email"
                                            label="Member's email"
                                            :rules="[
                                            () => !!editedItem.email || 'The email field is required',
                                            () => !!editedItem.email && editedItem.email.length >= 3 || 'The email field must be a valid email!',
                                            ]"
                                    >
                                    </v-text-field>
                               </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1"  @click.native="onCloseModal">Cancel</v-btn>
                        <v-btn color="blue darken-1"  @click.native="onSaveModal(editedItem.email)">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px" activator="item">
            <v-card >
                <v-card-title class="text">Are you sure you want to delete this member?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="onCloseModal">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem.team_id, editedItem.user_id)">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="team_user"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:item="props">
                <tr>
                    <td class="text-sm-left" >{{ props.item.member_name }}</td>
                    <td class="text-sm-left" >{{ props.item.email }}</td>
                    <td class="text-sm-left" >{{ props.item.role }}</td>
                    <td class="justify layout px-0" >
                        <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                            <v-icon color="pink">mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="getMember">Reset</v-btn>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination v-model="page" :length="pageLength" :total-visible="7"></v-pagination>
        </div>
        <v-spacer></v-spacer>

        <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
        <v-toolbar flat>
            <v-toolbar-title>List of pending members</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            
        </v-toolbar>
        <v-data-table
                :headers="header"
                :items="team_invites"
                :loading="loading"
                class="elevation-1"
            >
                <template v-slot:item="props">
                    <tr>
                        <td class="text-sm-left" >{{ props.item.email }}</td>
                        <td class="text-sm-left" >{{ props.item.status }}</td>
                    </tr>
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="getPendingMember">Reset</v-btn>
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
    name: 'member-list',
    data () {
        return {
            team_user: [
                {
                    id: '',
                    team_id: '',
                    user_id: ''
                }
            ],
            team_invites: [
                {
                    id: '',
                    team_id: '',
                    user_id: ''
                }
            ],
            page: 1,
            pageLength: 1,
            dialog: false,
            loading: false,
            dialogDelete: false,
            formTitle: 'New Member',
            headers: [
                {
                    text: 'Member Name',
                    value: 'member_name',
                    sortable: false
                },
                {
                    text: 'Member Email',
                    value: 'email',
                    sortable: false
                },
                {
                    text: 'Role',
                    value: 'role',
                    sortable: false
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                }
            ],
            editedItem: {
                email: ''
            },
            header: [
                {
                    text: 'Member Email',
                    value: 'email',
                    sortable: false
                },
                {
                    text: 'Status',
                    value: 'status',
                    sortable: false
                },
            ]
        }
    },
    mounted() {
        this.getMember();
        this.getPendingMember();
    },
    watch: {
        page() {
            this.getMember();
            this.getPendingMember();
        },
        dialogDelete (val) {
            val || this.onCloseModal()
        },
    },
    methods: {
        getMember() {
            this.loading = true;
            axios.get(`/member/${this.$route.params.id}`, 
            {
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
                    this.team_user = response.data.data;
                    this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
                    this.loading = false;
                }
            })
            .catch((error) => {
                this.loading = false;
                console.info(error.response);
            })
        },
        getPendingMember() {
            this.loading = true;
            axios.get(`team/pendingMember/${this.$route.params.id}`, 
            {
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
                    this.team_invites = response.data.data;
                    this.pageLength = Math.ceil(response.data.meta.total / response.data.meta.per_page);
                    this.loading = false;
                }
            })
            .catch((error) => {
                this.loading = false;
                console.info(error.response);
            })
        },
        deleteItem(item) {
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            const team_id = this.editedItem.team_id;
            const user_id = this.editedItem.user_id;
            axios.delete(`/member/${team_id}/${user_id}`)
                .then((response) => {
                    if(response.status === 200) {
                        this.$root.snackbarMsg = response.data.message;
                        this.$root.snackbar = true;
                    }
                });
            this.team_user.splice(this.editedIndex, 1)
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
        onSaveModal(email) {
            this.loading = true;
            let data = {
                email: email,
            };
            axios.post(`/member/${this.$route.params.id}`, data)
            .then((response) => {
                if(response.status === 201) {
                    this.dialog = false;
                    this.loading = false;
                    this.$root.snackbarMsg = response.data.message;
                    this.$root.snackbar = true;
                    this.editedItem = Object.assign({}, {email: ''});
                    this.getMember();
                }
            })
        },
    }
}
</script>