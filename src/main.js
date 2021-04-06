import Vue from 'vue'
import App from './App.vue'
import Routes from './routes.js'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const myRouter = new VueRouter({
  routes: Routes,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
