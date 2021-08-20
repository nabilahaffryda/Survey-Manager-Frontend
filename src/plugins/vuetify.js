import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css' ;
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        themes: {
          light: {
            primary: colors.blue.darken1,
            secondary: colors.grey.darken1,
            accent: colors.shades.black,
            error: colors.red.accent3,
            background: colors.indigo.lighten5, // Not automatically applied
          },
          dark: {
            primary: colors.blue.lighten3, 
            background: colors.indigo.base, // If not using lighten/darken, use base to return hex
          },
        },
      },
});
