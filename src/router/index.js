import Vue from 'vue'
import VueRouter from 'vue-router'
import NextFight from '../views/NextFight.vue'
import Admin from '../views/Admin.vue'
import Rankings from '../views/Rankings.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'UFC'
    }
  },
  {
    path: '/fights',
    name: 'NextFight',
    component: NextFight
  },
  {
    path: '/rankings',
    name: 'Rankings',
    component: Rankings
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter(
  {
    routes
  }
)

export default router
