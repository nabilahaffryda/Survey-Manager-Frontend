<template>
    <div>
        <div id="surveyEditorContainer"></div>
        <!-- <survey v-if="surveyConfig" :survey="surveyConfig"></survey> -->
    </div>
</template>
<script>
import * as SurveyEditor from 'surveyjs-editor'
import 'surveyjs-editor/surveyeditor.css'
import * as SurveyKo from "survey-knockout"
import * as widgets from "surveyjs-widgets"
import axios from 'axios'
import SurveyConfigVue from '../SurveyConfig.vue'
import Survey from 'survey-vue'
// import {SurveyConfig} from "../SurveyConfig.vue"
// import * as SurveyConfig from "survey-builder"
// import * as SurveyConfig from 'survey-vue'
// const SurveyConfig & surveyConfig = (const SurveyConfig&)getConfig();
//  const SurveyConfig = generateSurveyConfig(config);
// const SurveyConfig & surveyConfig = (const SurveyConfig&)getWorld()->getConfig();
// const getSurveysConfig = (): SurveyConfig[] => config.get('surveys');
// var SurveyConfig = getSurveyConfiguration();
// let surveyConfig: SurveyConfig;
// const SurveyConfig = surveysConfig[surveyCode];
// Survey
//     .StylesManager
//     .applyTheme("modern");
// const SurveyConfig = this.getSurvey();
// let SurveyConfig;
// const SurveyConfig = SurveyEditor.builder;
// const SurveyConfig = editorOptions.SurveyConfig || {};
// const SurveyConfig = axios.get('http://localhost:8080/survey', 
// {
//     headers: {
//         // "Authorization": "bearer " + localStorage.getItem('token'),
//         "Accept": "application/json",
//         "cache-control": "no-cache",
//         "Content-Type": "application/json"
//     }
// })
// const SurveyConfig = null;
// var SurveyConfig = {};

// Object.assign(SurveyConfig, sourceObj);
// var SurveyConfig;

// Object.filter = (obj, predicate) =>
//     Object.keys(obj)
//         .filter( key => predicate(obj[key]) )
//         .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );

// const widgetsList = Object.filter(Survey.widgets, widget => widget === true);

// Object.keys(widgetsList).forEach(function (widget) {
//     widgets[widget](SurveyKo);
// });

export default {
    name: 'survey-builder',
    props: ['json', 'id'],
    data(){
        return{
            surveyData: this.json,
            surveyId: this.id
        }
    },
    mounted(){
        let editorOptions = SurveyConfigVue.builder;
        SurveyEditor.StylesManager.applyTheme("modern");
        this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
        this.editor.text = JSON.stringify(this.surveyData);
        let self = this;
        this.editor.saveSurveyFunc = function () {  
            axios.put('/survey/' + self.id, {json: JSON.parse(this.text)})
                .then((response) => {
                    self.editor.text = JSON.stringify(response.data.data.json);
                    self.$root.snackbar = true;
                    self.$root.snackbarMsg = response.data.message;
                })
                .catch((error) => {
                    console.error(error.response);
                })
        };
    }
}
</script>