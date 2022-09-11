import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/PagePaymentSelect.vue'),
    },
    {
      path: '/creaditCardInfo',
      name: 'CreaditCardInfo',
      component: () => import('../views/PageCreaditCardInfo.vue'),
    },
    {
      path: '/atmInfo',
      name: 'AtmInfo',
      component: () => import('../views/PageAtmInfo.vue'),
    },
    {
      path: '/shopInfo',
      name: 'ShopInfo',
      component: () => import('../views/PageShopInfo.vue'),
    },
    {
      path: '/shopFinish',
      name: 'ShopFinish',
      component: () => import('../views/PageShopFinish.vue'),
    },
    {
      path: '/finish',
      name: 'Finish',
      component: () => import('../views/PageFinish.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {
        name: 'Home',
      },
    },
  ],
})

export default router
