<template>
  <v-app>
    <v-app-bar app color="#ffffff" flat>
      <Header/>
    </v-app-bar>
    <v-main>
    <router-view/>
    <v-snackbar :timeout="6000" bottom right multi-line v-model="$root.snackbar">
      {{ $root.snackbarMsg }}
      <v-btn color="blue" @click.native="$root.snackbar = false">Close</v-btn>
    </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
