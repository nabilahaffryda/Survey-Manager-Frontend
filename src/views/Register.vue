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
                    <form @submit.prevent="submitRegister">
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-text-field outline label="Username" v-model="form.username" name="username" type="text">
                                    </v-text-field>
                                    <v-text-field outline label="Email" v-model="form.email" name="email" type="email">
                                    </v-text-field>
                                    <v-text-field outline label="Password" v-model="form.password" name="password" type="password">
                                    </v-text-field>
                                    <v-text-field outline label="Confirm Password" v-model="form.c_password" name="c_password" type="password">
                                    </v-text-field>
                                </v-col> 
                            </v-row>
                        </v-col>
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-btn block="" color="primary" type="submit" @click="submitRegister()">
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
                    <!-- <p v-if="showError" id="error">Username already exists</p> -->
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
    //   showError: false
    };
  },
  methods: {
    ...mapActions(["Register"]),
    async submitRegister() {
        console.log(this.Register(this.form))
        this.$router.push("/login");
        // await this.Register(this.form);
        // this.$router.push("/login");
    //   try {
    //     await this.Register(this.form);
    //     this.$router.push("/login");
    //     // this.showError = false
    //   } catch (error) {
    //     // this.showError = true
    //   }
    },
  },
};
</script>