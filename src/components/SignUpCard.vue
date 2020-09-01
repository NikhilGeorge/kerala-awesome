<template>
    <v-card class="elevation-12">
      <v-progress-linear v-if="inProgress" indeterminate color="primary"></v-progress-linear>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field v-model="name" label="Name" name="name" prepend-icon="person" type="text" ></v-text-field>
          <v-text-field v-model="email" label="Email" name="email" prepend-icon="email" type="text"></v-text-field>
          <v-text-field v-model="password" id="password" label="Password" name="password" prepend-icon="lock" type="password" ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="signup">Sign Up</v-btn>
      </v-card-actions>
      <v-alert v-if="errorMsg.length" dismissible  type="error">     {{ errorMsg }}  </v-alert>
    </v-card>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                inProgress: false,
                errorMsg: ''
            }
        },
        methods:{
            signup(){
                this.inProgress = true
                fb.auth.createUserWithEmailAndPassword(this.email, this.password)
                    .then((result) => {
                        let user = result.user
                        this.$store.commit('setCurrentUser', user)
                        //create a user in userCollections table
                        user.updateProfile({
                            displayName: this.name
                        })  
                            .then(() => {
                                this.inProgress = false
                                this.$router.push('/')
                            }).catch((err) => {
                                this.inProgress = false
                                this.errorMsg = err.message
                            });
                        
                    }).catch((err) => {
                        this.inProgress = false
                        this.errorMsg = err.message
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>