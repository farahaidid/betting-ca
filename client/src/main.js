import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Bootstap vue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"

// Using bootstrap vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Bootstrap stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Using vue toast
import "vue-toast-notification/dist/theme-default.css"
import VueToast from "vue-toast-notification"
Vue.use(VueToast)

// Using syntax highlight
import 'highlight.js/styles/default.css';

import VueHighlightJS from 'vue-highlight.js';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import vue from 'vue-highlight.js/lib/languages/vue';

//Use Vue Highlight.js
Vue.use(VueHighlightJS, {
   languages: { css, javascript, vue }
});

// Initialing vue
new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app')
