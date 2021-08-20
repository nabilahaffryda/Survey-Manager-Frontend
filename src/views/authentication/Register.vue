<template>
    <v-container>
        <v-layout wrap style="margin-top: 20px;">
            <v-flex sm12 md6 offset-md3>
                <v-card>
                    <v-col md="12" >
                        <h2 class="text-center">
                            Create Account
                        </h2>
                    </v-col>
                    <ValidationObserver v-slot="{ submitRegister }">
                        <form @submit.prevent="submitRegister">
                            <v-col md="12">
                                <v-row>
                                    <v-col md="12">
                                        <ValidationProvider name="username" rules="required" v-slot="{ errors }">
                                            <v-text-field outline label="Username" 
                                                v-model="form.username" type="text">
                                            </v-text-field>
                                            <span>{{ errors[0] }}</span>
                                        </ValidationProvider>
                                        <ValidationProvider  name="email" rules="required|email" v-slot="{ errors }">
                                            <v-text-field outline label="Email" 
                                                v-model="form.email" type="email">
                                            </v-text-field>
                                            <span>{{ errors[0] }}</span>
                                        </ValidationProvider>
                                        <ValidationProvider  name="password" rules="required|max:12|min:8" v-slot="{ errors }">
                                            <v-text-field outline label="Password" 
                                            v-model="form.password" 
                                            type="password">
                                            </v-text-field>
                                            <span>{{ errors[0] }}</span>
                                        </ValidationProvider>
                                         <ValidationProvider  name="confirm password" rules="required|confirmed:password" v-slot="{ errors, valid }" >
                                            <v-text-field outline label="Confirm Password" :state="errors[0] ? false : (valid ? true : null)"
                                            v-model="form.c_password" name="c_password" type="password">
                                            </v-text-field>
                                            <span>{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </v-col> 
                                </v-row>
                            </v-col>
                            <v-col md="12">
                                <v-row>
                                    <v-col md="12">
                                        <v-btn block="" color="primary" type="button" @click="submit()">
                                            Register
                                        </v-btn>
                                    </v-col>
                                    <v-col md="12">
                                        <p class="text-center">
                                            Already have an account? <router-link to="/login">Sign in</router-link>
                                        </p>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </form>
                    </ValidationObserver>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "Register",
    components: {},
    data() {
        return {
        form: {
            username: "",
            email: "",
            password: "",
        },
        };
    },
    // mounted() {
    //     this.checkQuery();
    // },
    methods: {
        ...mapActions(["Register"]),
        async submit() {
            try {
            await(this.Register(this.form));
                this.$router.push("/login");
            } catch (error) {
                console.log(error)
            }
        },
        // selectedEmail(){
        //     this.email = this.form.email;
        // },
        // async checkQuery(){
        //     if(this.$route.query.email){
        //         this.verification_code = this.query.email;
        //         window.history.replaceState({}, document.title, "/verification");
        //         this.$nextTick(()=> {
        //             this.verify();
        //         })
        //     }else{
        //         this.verification_code = null;
        //     }
        // }
    },
};
</script>