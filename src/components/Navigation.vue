<template>
    <div>
      <v-app-bar
        color="primary"
        dense
        dark
      >
  
        <v-toolbar-title><h3>Awesome Kerala</h3></v-toolbar-title>
            
        <v-spacer></v-spacer>
        <router-link class="navlinks" to="Home"> Home </router-link>
        <router-link class="navlinks" v-if="currentUser" to="Admin"> Admin </router-link>
        <router-link class="navlinks" v-if="!currentUser" to="Login"> Login </router-link>
        <a class="navlinks" v-if="currentUser" @click="logout"> Log Out </a>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
</template>
<script>
const fb = require('../firebaseConfig.js')
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['currentUser'])
    },
    methods:{
        logout(){
            fb.auth.signOut()
                .then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch((err) => {
                    console.log(err.message);
                });
        }
    }
}
</script>
<style scoped>
.navlinks{
    color: #ffffff;
    text-decoration: none;
    text-emphasis: bold;
    padding-right: 2ex;
}
</style>