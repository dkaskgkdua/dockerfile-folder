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
  },
  {
    path: '/example',
    name: 'example',
    component: () => import(/* webpackChunkName: "example", webpackPrefetch:true */ '../views/Example.vue')
  },
  {
    path: '/provider',
    name: 'provider',
    component: () => import(/* webpackChunkName: "example", webpackPrefetch:true */ '../views/ProvideInject.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import(/* webpackChunkName: "calculator" */ '../views/Calculator.vue')
  },
  {
    path: '/compositionapi1',
    name: 'Compositionapi1',
    component: () => import(/* webpackChunkName: "composition" */ '../views/CompositionAPI.vue')
  },
  {
    path: '/compositionapi2',
    name: 'Compositionapi2',
    component: () => import(/* webpackChunkName: "composition" */ '../views/CompositionAPI2.vue')
  },
  {
    path: '/compositionapi3',
    name: 'Compositionapi3',
    component: () => import(/* webpackChunkName: "composition" */ '../views/CompositionAPI3.vue')
  },
  {
    path: '/compositionapi4',
    name: 'Compositionapi4',
    component: () => import(/* webpackChunkName: "composition" */ '../views/CompositionAPI4.vue')
  },
  {
    path: '/compositionapiprovide',
    name: 'Composition-Api-Provide',
    component: () => import(/* webpackChunkName: "composition" */ '../views/CompositionAPIProvide.vue')
  },
  {
    path: '/customdirective',
    name: 'CustomDirective',
    component: () => import(/* webpackChunkName: "directive" */ '../views/CustomDirective.vue')
  },
  {
    path: '/plugins',
    name: 'Plugins',
    component: () => import(/* webpackChunkName: "about" */ '../views/Plugins.vue')
  },
  {
    path: '/storeacceess',
    name: 'StoreAccess',
    component: () => import(/* webpackChunkName: "about" */ '../views/StoreAccess.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
