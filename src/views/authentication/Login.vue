<template>
    <v-container>
        <v-layout wrap style="margin-top: 80px;">
            <v-flex sm12 md6 offset-md3>
                <v-card>
                    <v-col md="12" >
                        <h2 class="text-center">
                            Login
                        </h2>
                    </v-col>
                     <ValidationObserver v-slot="{ submitLogin }">
                    <form @submit.prevent="submitLogin">
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
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
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-btn block="" color="primary" type="submit" @click="submit()">
                                        Login
                                    </v-btn>
                                </v-col>
                                <v-col md="12">
                                    <p class="text-center">
                                        Don't have an account? <router-link to="register">Sign Up</router-link>
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
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
          await(this.LogIn(User)) ;
          this.$router.push("/surveylist");
      } catch (error) {
          console.log(error)
      }
    },
  },
};
</script>
