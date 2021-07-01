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
                    <form @submit.prevent="submitLogin">
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-text-field  outline label="Email" v-model="form.email" name="email" type="email">
                                    </v-text-field>
                                    <v-text-field  outline label="Password" v-model="form.password" name="password" type="password">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col md="12">
                            <v-row>
                                <v-col md="12">
                                    <v-btn block="" color="primary" type="submit" @click="submitLogin()">
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
                    <p v-if="showError" id="error">Username or Password is incorrect</p>
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
      showError: false
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submitLogin() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
    //   console.log(this.LogIn(User))
    //     // await this.LogIn(User);
    //       this.$router.push("/dashboard");
      try {
          await this.LogIn(User);
          this.$router.push("/dashboard");
          this.showError = false
      } catch (error) {
        this.showError = true
      }
    },
  },
};
</script>
