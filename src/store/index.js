import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged( user => {
   // ensure user is set even if the page is refreshed
  if(user){
      store.commit('setCurrentUser', user)
  }
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
  },
  actions: {
    clearData({commit}){
      commit('setCurrentUser', null)
    }
  },
  modules: {
  }
})

export default store