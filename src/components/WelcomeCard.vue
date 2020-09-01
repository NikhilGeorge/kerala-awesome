<template>
<div v-if="currentUser" align="center">
     
Logged in as {{ currentUser.displayName }} ( 
    <a @click="logout">logout</a>
)
    
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