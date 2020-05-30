<template>
    <v-card class="elevation-12">
      <v-progress-linear v-if="inProgress" indeterminate color="primary"></v-progress-linear>
      <v-card-text>
        <v-form @submit.prevent>
          <v-text-field v-model="email" label="Email" name="login" prepend-icon="person" type="text" ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="reset" color="error">Reset Password</v-btn>
      </v-card-actions>
       <v-alert v-if="errorMsg.length" dismissible  type="error">     {{ errorMsg }}  </v-alert>
       <v-alert v-if="successMsg.length" dismissible  type="success">     {{ successMsg }}  </v-alert>
    </v-card>
</template>

<script>
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                email: '',
                inProgress: false,
                errorMsg: '',
                successMsg: ''
            }
        },
        methods:{
            reset(){
                this.inProgress = true
                this.errorMsg = ''
                fb.auth.sendPasswordResetEmail(this.email)
                    .then(() => {
                        this.inProgress = false
                        this.successMsg = 'Password Reset Email Sent'
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