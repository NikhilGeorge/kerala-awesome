<template>
 <div align="center">
    <h3>Add a new reason</h3>
    <v-card class="elevation-12">
    
        <v-tabs fixed-tabs background-color="primary" dark>
          <v-tab @click="showTextFn"> <v-icon>mdi-text</v-icon>Text </v-tab>
          <v-tab @click="showVideoFn"> <v-icon>mdi-youtube</v-icon>Youtube</v-tab>
          <v-tab @click="showLinkFn"> <v-icon>mdi-link</v-icon>Link </v-tab>
        </v-tabs>
        <v-progress-linear v-if="inProgress" indeterminate color="primary"></v-progress-linear>
          <v-card-text>
            <v-form @submit.prevent>
                <v-textarea v-if="postType === 'text'" label="Kerala is awesome because ... " name="post" prepend-icon="document" v-model="content" ></v-textarea>
                <v-text-field v-if="postType === 'video'" label="Youtube Link" name="video" prepend-icon="camera" type="text" v-model="video" ></v-text-field>
                <v-text-field v-if="postType === 'link'" label="URL" name="link" prepend-icon="link" type="text" v-model="link" ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="createPost">Create Post</v-btn>
          </v-card-actions>
          <v-alert v-if="errorMsg.length" dismissible  type="error">     {{ errorMsg }}  </v-alert>
          <v-alert v-if="successMsg.length" dismissible  type="success">     {{ successMsg }}  </v-alert>
          <v-snackbar v-model="snackbar" v-if="successMsg.length" :timeout="timeout" > {{ successMsg }} <v-btn color="blue" text @click="snackbar = false" > Close </v-btn> </v-snackbar>
    </v-card>
 </div>
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
                video: '',
                link: '',
                successMsg: '',
                postType: 'text',
                snackbar: true

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
                    likes: 0,
                    video: this.video,
                    link: this.link,
                    postType: this.postType
                })
                    .then(() => {
                        this.inProgress = false
                        this.content = ''
                        this.successMsg = 'Added successfully'
                    }).catch((err) => {
                        this.errorMsg = err.message
                    });
                
            },
            showTextFn(){
                this.postType = 'text'
            },
            showVideoFn(){
                this.postType = 'video'
            },
            showLinkFn(){
                this.postType = 'link'
            }

        },
        computed:{
            ...mapState(['currentUser', 'userProfile'])
        }
        
    }
</script>

<style lang="scss" scoped>

</style>