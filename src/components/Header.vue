<template>
    <v-container>
        <v-toolbar flat>
            <v-toolbar-title >
                <v-btn text @click="redirectHome()">
                    Survey Manager
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="isLoggedIn">
                <v-btn text @click="redirectCreateSurvey()">
                    Create Survey
                </v-btn>
                <v-btn text @click="logout()">
                    Log out
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-else>
                <v-btn text @click="redirectLogin()">
                    Login
                </v-btn>
                <v-btn text @click="redirectRegister()">
                    Register
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-container>
</template>
<script>
export default {
    name: 'Header',
    computed: {
        isLoggedIn: function() {
        return this.$store.getters.isAuthenticated;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("LogOut");
            this.$router.push("/login");
        },
        redirectLogin(){
            this.$router.push('/login')
        },
        redirectRegister(){
            this.$router.push('/register')
        },
        redirectHome(){
            this.$router.push('/')
        }
    }
}
</script>