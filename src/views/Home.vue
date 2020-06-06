<template>
<v-content>
 <v-container fill-height fluid>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8">
        

        <PostCard />
        <WelcomeCard />
    </v-col>
    </v-row>
  </v-container>
</v-content>
</template>

<script>
import PostCard from '@/components/PostCard'
import WelcomeCard from '@/components/WelcomeCard'

    export default {
        components:{
            PostCard,
            WelcomeCard
        }
        
    }
</script>

<style lang="scss" scoped>

</style>