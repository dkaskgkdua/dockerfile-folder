import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 방문되는 순간 가져옴
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    // prefetch 적용 -> 첫 로딩 시 캐시에 올라오게 됨.
    component: () => import(/* webpackChunkName: "contact", webpackPrefetch:true */ '../views/Contact.vue')
  },
  {
    path: '/serverdata',
    name: 'serverData',
    // prefetch 적용 -> 첫 로딩 시 캐시에 올라오게 됨.
    component: () => import(/* webpackChunkName: "server", webpackPrefetch:true */ '../views/ServerData.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
