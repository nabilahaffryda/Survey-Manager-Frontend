<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title>List of all available surveys</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
                :headers="headers"
                :items="surveys"
                :loading="loading"
                class="elevation-1"
        >
            <template v-slot:item="props">
                <tr>
                    <td class="text-sm-left ">{{ props.item.survey_name }}</td>
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
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <v-btn color="primary" @click="getSurveys">Reset</v-btn>
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
    name: 'list-survey',
    data () {
        return {
            surveys: [],
            page: 1,
            pageLength: 1,
            loading: false,
            headers: [
                
                {
                    text: 'Survey Name',
                    value: 'survey_name',
                    sortable: false
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
                
            ],
        }
    },
    mounted() {
        this.getSurveys();
    },
    watch: {
        page() {
            this.getSurveys();
        }
    },
    methods: {
        getSurveys() {
            this.loading = true;
            axios.get(`/team/surveyTeam/${this.$route.params.id}`, 
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
        editItem(id) {
            this.$router.push({name: 'editor', params: {id: id}})
        },
        runSurvey(slug) {
            window.open('/' + SurveyConfigVue.route_prefix + '/' + slug, '_blank');
        },
        showResults(id) {
            this.$router.push({name: 'result', params: {id: id} })
        }
    }
}
</script>