<template>
    <div class="wrapper">
        <survey v-if="SurveyConfig" :survey="SurveyConfig"></survey>
    </div>
</template>

<script>
import * as SurveyJS from 'survey-vue'

export default {
    name: 'survey-config',

    props: {
        config: {
            type: Object,
            default: undefined
        }
    },

    computed: {
        SurveyConfig() {
            return this.config ? SurveyJS.Model(this.config) : undefined
        }
    },

    components: {
        survey: SurveyJS.Survey
    }
}
</script>