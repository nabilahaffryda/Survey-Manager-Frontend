<template>
    <v-container>
        <v-layout v-if="User">
            <h3>Hi {{User}}</h3>
        </v-layout>
    </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "Dashboard",
    computed: {
        ...mapGetters({ Posts: "StatePosts", User: "StateUser" }),
    },
}
</script>