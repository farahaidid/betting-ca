import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store"

Vue.use(VueRouter)

const views = name => () => import(`@/views/${name}.vue`)

const routes = [
   {
      path: '/',
      component: Home
   },
   {
      path: '/withdraw',
      name: 'withdraw',
      component: views('Withdraw')
   },
   {
      path: '/sign-in',
      name: 'sign-in',
      component: views('SignIn')
   },
   {
      path: '/sign-up',
      name: 'sign-up',
      component: views('SignUp')
   }
]

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes
})

router.beforeEach((to, from, next) => {
   let LOGGED_IN = store.getters['AUTH/LOGGED_IN']
   if (to.path === '/sign-in' && LOGGED_IN) { next("/") }
   else { next() }
})

export default router
