<template>
   <v-card class="elevation-12">
    <v-progress-linear v-if="inProgress" indeterminate color="primary"></v-progress-linear>
      <v-card-text>
        <v-form @submit.prevent>
          <v-textarea label="Kerala is awesome because ... " name="post" prepend-icon="document" v-model="content" ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createPost">Create Post</v-btn>
      </v-card-actions>
      <v-alert v-if="errorMsg.length" dismissible  type="error">     {{ errorMsg }}  </v-alert>
      <v-alert v-if="successMsg.length" dismissible  type="success">     {{ successMsg }}  </v-alert>

     
    </v-card>
</template>

<script>
    import {mapState} from 'vuex'
    const fb = require('../firebaseConfig.js')
    export default {
        data() {
            return {
                errorMsg: '',
                inProgress: false,
                content: '',
                successMsg: ''
            }
        },
        methods:{
            createPost(){
                this.inProgress = true
                fb.postsCollection.add({
                    createdOn: new Date(),
                    content: this.content,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                    comments: 0,
                    likes: 0
                })
                    .then(() => {
                        this.inProgress = false
                        this.content = ''
                        this.successMsg = 'Added successfully'
                    }).catch((err) => {
                        this.errorMsg = err.message
                    });
                
            }
        },
        computed:{
            ...mapState(['currentUser', 'userProfile'])
        }
        
    }
</script>

<style lang="scss" scoped>

</style>