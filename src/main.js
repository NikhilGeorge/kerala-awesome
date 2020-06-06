import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueYouTubeEmbed from 'vue-youtube-embed'


const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)

// handle page reloads
let app
fb.auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            vuetify,
            render: h => h(App)
        })
    }
})
