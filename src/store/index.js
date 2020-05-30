import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val){
      state.userProfile = val
    }
  },
  actions: {
    fetchUserProfile({commit, state}) {
      fb.usersCollection.doc(state.currentUser.uid).get()
        .then((result) => {
          commit('setUserProfile', result.data())
        }).catch((err) => {
          console.log(err.message);
        });
    },
    clearData({commit}){
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    }
  },
  modules: {
  }
})
