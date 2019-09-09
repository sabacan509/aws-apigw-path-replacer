import Vue from 'vue'
import Router from 'vue-router'
import Region from './views/Region.vue'
import Howto from './views/Howto.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'region',
      component: Region
    },
    {
      path: '/howto',
      name: 'howto',
      component: Howto
    },
    {
      path: '/pathEditor',
      name: 'pathEditor',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/PathEditor.vue')
    }
  ]
})
