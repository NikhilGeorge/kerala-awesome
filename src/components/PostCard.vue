<template>
<div>
 <v-card class="mx-auto" color="#357C93" dark max-width="600" >
       <v-img
        src="https://source.unsplash.com/collection/6778948"
        height="194"
      ></v-img>
      <v-card-title> <v-icon large left > mdi-twitter </v-icon> <span class="title font-weight-light">Kerala is awesome because ... </span> </v-card-title>
       <v-card-text class="headline font-weight-bold"> {{ post.content}} </v-card-text>
  
      <v-card-actions>
        <v-list-item class="grow">
            <v-icon class="mr-1">mdi-account-circle-outline</v-icon>
            <v-list-item-content>
            <v-list-item-title>{{ post.userName }}</v-list-item-title>
          </v-list-item-content>
  
          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">mdi-clock</v-icon>
            <span class="subheading mr-2">{{ post.createdOn | formatDate }} </span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-heart</v-icon>
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
  export default {
    data() {
      return {
        post: ''
      }
    },
    created(){
      this.getRandomPost()
    },
    methods: {
      getRandomPost(){
        var key = fb.postsCollection.doc().id
        console.log(key);

        fb.postsCollection.where(firebase.firestore.FieldPath.documentId(), ">", key).orderBy(firebase.firestore.FieldPath.documentId()).limit(1).get()
          .then((querySnapshot) => {
            if(querySnapshot){
              console.log('Hit 1');
              querySnapshot.forEach( (doc) => {
                console.log(doc.data())
                this.post = doc.data()
              })
            }
            else{
              fb.postsCollection.where(firebase.firestore.FieldPath.documentId(), "<", key).orderBy(firebase.firestore.FieldPath.documentId()).limit(1).get()
                .then((querySnapshot) => {
                  if(querySnapshot){
                    console.log('Hit 2');
                    querySnapshot.forEach( (doc) => {
                      console.log(doc.data())
                      this.post = doc.data()
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
</style>