<template>
    <div>
        <div id="surveyCreatorContainer"></div>
    </div>
</template>
<script>
// import * as SurveyEditor from 'surveyjs-editor'
// import 'surveyjs-editor/surveyeditor.css'
import "survey-creator/survey-creator.css";
import * as SurveyKo from "survey-knockout"
import * as widgets from "surveyjs-widgets"
import axios from 'axios'
import * as SurveyCreator from 'survey-creator'
import SurveyConfigVue from '../SurveyConfig.vue'

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => Object.assign(res, { [key]: obj[key] }), {} );

const widgetsList = Object.filter(widget => widget === true);

Object.keys(widgetsList).forEach(function (widget) {
    widgets[widget](SurveyKo);
});

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
        SurveyCreator.StylesManager.applyTheme("modern");
        this.editor = new SurveyCreator.SurveyCreator('surveyCreatorContainer', editorOptions);
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
