<template>
<v-content>
 <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-tabs fixed-tabs background-color="primary" dark>
            <v-tab @click="showSignInFn"> Sign In </v-tab>
            <v-tab @click="showSignUpFn"> Sign Up </v-tab>
            <v-tab @click="showResetFn"> Reset Password </v-tab>
          </v-tabs>
          <LoginCard v-if="showSignIn"/>
          <SignUpCard v-if="showSignUp" />
          <PasswordResetCard v-if="showReset" />
          <div align="center">
            <router-link class="navbtn" to="Home">
                <v-btn class="ma-2" tile outlined color="success">
                    <v-icon left>mdi-home</v-icon> Home
                </v-btn>
            </router-link>
            </div>
        </v-col>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
  import LoginCard from '@/components/LoginCard.vue'
  import SignUpCard from '@/components/SignUpCard.vue'
  import PasswordResetCard from '@/components/PasswordResetCard.vue'

  export default {
    data() {
      return{
        showSignIn: true,
        showSignUp: false,
        showReset: false,
      }
    },
    components:{
      LoginCard,
      SignUpCard,
      PasswordResetCard
    },
    methods:{
      showSignInFn(){
        this.showSignIn = true,
        this.showSignUp = false,
        this.showReset = false

      },
      showSignUpFn(){
        this.showSignIn = false,
        this.showSignUp = true,
        this.showReset = false
      },
      showResetFn(){
        this.showSignIn = false,
        this.showSignUp = false,
        this.showReset = true
      }
    }
      
  }
</script>

<style lang="scss" scoped>
.navbtn{
  text-decoration: none;
}
</style>