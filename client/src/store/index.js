import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'


import { state, getters, mutations } from "./global/index.store"

// Modules
import AUTH from "./modules/auth.store"

Vue.use(Vuex)

let store = new Vuex.Store({
   state, getters, mutations,
   modules: {
      AUTH
   },
   plugins: [persistedState()]
})

export default store