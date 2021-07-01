<template>
    <v-container>
        <v-layout wrap style="margin-top: 60px;">
            <v-flex sm12 md6 offset-md3>
                <v-card>
                    <v-col md="12" >
                        <h2 class="text-center">
                            Create Account
                        </h2>
                    </v-col>
                    <form @submit.prevent="submit">
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-text-field outline label="Username" v-model="username" name="username" type="text">
                                    </v-text-field>
                                    <v-text-field outline label="Email" v-model="email" name="email" type="email">
                                    </v-text-field>
                                    <v-text-field outline label="Password" v-model="password" name="password" type="password">
                                    </v-text-field>
                                    <v-text-field outline label="Confirm Password" v-model="c_password" name="password" type="password">
                                    </v-text-field>
                                </v-col> 
                            </v-row>
                        </v-col>
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-btn block="" color="primary" v-on:click="RegisterAcc" type="submit">
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
                    <p v-if="showError" id="error">Username or Password is incorrect</p>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Register',
    data(){
        return(
            username= '',
            email= '',
            password= '',
            c_password= ' '
        )
    },
    methods:{
        async registerAcc(){
            let result = await axios.post("",{
                email:this.email,
                password:this.password,
                username:this.username,
                c_password:this.c_password
            });

            console.warn(result);
            if(result.status==200){
                alert("Create Account Success");
                
            }
        }
    }
}
</script>