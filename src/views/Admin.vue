<template>
<v-content>
 <v-container fluid fill-height>
    <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
            <CreatePostCard />
            <div align="center">
                <router-link class="navbtn" to="Home">
                    <v-btn class="ma-2" tile outlined color="success">
                        <v-icon left>mdi-home</v-icon> Home
                    </v-btn>
                </router-link>
            </div>
            <WelcomeCard />
        </v-col>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
import CreatePostCard from '@/components/CreatePostCard'
import WelcomeCard from '@/components/WelcomeCard'
    export default {
        components:{
            CreatePostCard,
            WelcomeCard
        }
        
    }
</script>

<style lang="scss" scoped>
.links{
    align-self : center
}
.navbtn{
  text-decoration: none;
}
</style>