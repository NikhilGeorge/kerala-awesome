<template>
    <v-card class="elevation-12">
    <v-progress-linear v-if="inProgress" indeterminate color="primary"></v-progress-linear>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            label="Login"
            name="login"
            prepend-icon="person"
            type="text"
            v-model="email"
          ></v-text-field>
          <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
      <v-alert v-if="errorMsg.length" dismissible  type="error">     {{ errorMsg }}  </v-alert>
     
    </v-card>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                email: '',
                password: '',
                errorMsg: '',
                inProgress: false
            }
        },
        methods:{
            login(){
                this.inProgress = true
                this.errorMsg = ''
                console.log('Login');
                fb.auth.signInWithEmailAndPassword(this.email, this.password)
                .then((result) => {
                    console.log('Success');
                    console.log(result.user);
                    this.$store.commit('setCurrentUser', result.user)
                    this.inProgress = false
                    this.$router.push('/admin')

                }).catch((err) => {
                    this.inProgress = false
                    console.log('err.me');
                    this.errorMsg = err.message 
                });
                
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>