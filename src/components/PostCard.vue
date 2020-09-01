<template>
<div>
  <v-card class="mx-auto" color="#357C93" dark max-width="600" >
      <v-progress-linear v-if="isLoading"  indeterminate height="10" color="yellow darken-2" ></v-progress-linear>
      <v-progress-linear v-if="!isLoading" height="10" color="yellow darken-2" ></v-progress-linear>
      <v-card-title> <v-icon large left > mdi-twitter </v-icon> <span class="title font-weight-light">Kerala is awesome because ... </span> </v-card-title>
      <div v-if="post.postType == 'text'" >
        <v-img src="https://source.unsplash.com/collection/6778948" height="194" ></v-img>
        <v-card-text class="headline font-weight-bold"> {{ post.content}} </v-card-text>
      </div>
      <div v-if="post.postType == 'video'">
        <v-card-text class="headline font-weight-bold">
          <div align="center" justify="center"><youtube :video-id="getYoutubeId(post.video)" player-width="550"></youtube> </div>
        </v-card-text>
      </div>
      <div v-if="post.postType == 'link'" class="headline font-weight-bold">
        <link-prevue :url="post.link">
          <template slot="loading">
          </template>
          <template slot-scope="props">
            <v-img :src="props.img" :alt="props.title"   height="194" ></v-img>
            <v-card-title> <span class="title font-weight-light">{{props.title}} </span> </v-card-title>
            <v-card-text> {{props.description}} <a v-bind:href="props.url" class="btn btn-primary">[ Read More ]</a></v-card-text>
          </template>
        </link-prevue>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-list-item class="grow">
            <v-icon class="mr-1">mdi-comment-account-outline</v-icon>
            <v-list-item-content>
            <v-list-item-title>{{ post.userName }} , {{ post.createdOn | formatDate }}</v-list-item-title>
            </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          >
           
            <a @click="likePost()">
              <v-icon v-if="postLiked" class="mr-1">mdi-heart</v-icon>
              <v-icon v-if="!postLiked" class="mr-1">mdi-heart-outline</v-icon>
            </a>
            <span class="subheading mr-2">{{ post.likes }} </span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>

  </v-card>

    <div class="actions" align="center">
     
    <v-btn @click="getRandomPost" class="ma-2" tile outlined color="success">
        <v-icon left>mdi-refresh</v-icon> Show New
    </v-btn>
    <router-link class="navbtn" to="Admin">
      <v-btn class="ma-2" tile outlined color="warning">
          <v-icon left>mdi-plus</v-icon> Add New
      </v-btn>
     </router-link>
    </div>   
      
</div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import firebase from 'firebase'
import moment from 'moment'
import { getIdFromURL } from 'vue-youtube-embed'
import LinkPrevue from 'link-prevue'

  export default {
    data() {
      return {
        post: '',
        postId: '',
        videoId: '',
        postLiked : false, 
        isLoading: true

      }
    },
    created(){
      this.getRandomPost()
    },
    components:{
      LinkPrevue
    },
    methods: {
      getRandomPost(){
        this.isLoading = true
        this.postLiked = false
        var key = fb.postsCollection.doc().id
        console.log(key);

        fb.postsCollection.where(firebase.firestore.FieldPath.documentId(), ">", key).orderBy(firebase.firestore.FieldPath.documentId()).limit(1).get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            if(!querySnapshot.empty){
              console.log('Hit 1');
              querySnapshot.forEach( (doc) => {
                console.log(doc.data())
                this.post = doc.data()
                this.postId = doc.id
                this.isLoading = false
              })
            }
            else{
              fb.postsCollection.where(firebase.firestore.FieldPath.documentId(), "<", key).orderBy(firebase.firestore.FieldPath.documentId()).limit(1).get()
                .then((querySnapshot) => {
                  console.log(querySnapshot);
                  if(!querySnapshot.empty){
                    console.log('Hit 2');
                    querySnapshot.forEach( (doc) => {
                      console.log(doc.data())
                      this.post = doc.data()
                      this.postId = doc.id
                      this.isLoading = false
                    })
                  }
                  else{
                    console.log("hit 3");
                    this.post = "Its always awesome"
                  }
                })
            }

          }).catch((err) => {
            console.log(err);
          });
      },
      getYoutubeId(url){
        return getIdFromURL(url)
      },
      likePost(){
        console.log(this.postId)
        this.isLoading = true
        if(this.postLiked){
          //alreadt liked, unkike
          fb.postsCollection.doc(this.postId).update({
                likes: this.post.likes - 1
          })
            .then(() => {
              this.post.likes = this.post.likes - 1
              this.isLoading = false
            }).catch((err) => {
              console.log(err.message)

            });
        }
        else{
          //like
          fb.postsCollection.doc(this.postId).update({
                likes: this.post.likes + 1
          })
            .then(() => {
              this.post.likes = this.post.likes + 1
              this.isLoading = false
            }).catch((err) => {
              console.log(err.message)
            });
        }
        this.postLiked = !this.postLiked
        console.log(this.postLiked)
      }
    },
    filters: {
      formatDate(val){
        if(!val) return '-'
        let date = val.toDate();
        return moment(date).fromNow();
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.actions {
  padding-top: 5ex;
}
.navbtn{
  text-decoration: none;
}
.actionbar {
  color: red
}
</style>