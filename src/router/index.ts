import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      //meta: { requiresAuth: true },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      //meta: { requiresAuth: true },
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../views/CardView.vue'),
      children: [
        {
          path: 'recharge',
          name: 'card-recharge',
          component: () => import('../views/CardRechargeView.vue'),
        },
      ],
      //meta: { requiresAuth: true },
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('../views/RewardsView.vue'),
      //meta: { requiresAuth: true },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      //meta: { requiresAuth: true },
    },
    {
      path: '/account/verify',
      name: 'account-verify',
      component: () => import('../views/AccountVerifyView.vue'),
      //meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/DashboardView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

/*router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const waitUntilLoaded = () => {
    return new Promise((resolve) => {
      if (!authStore.isInitialLoading) return resolve(true)
      const unwatch = watch(
        () => authStore.isInitialLoading,
        (val) => {
          if (!val) {
            unwatch()
            resolve(true)
          }
        },
      )
    })
  }

  await waitUntilLoaded()

  if (to.meta.requiresAuth && !authStore.authenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.authenticated) {
    next('/dashboard')
  } else if (to.path === '/register' && authStore.authenticated) {
    next('/dashboard')
  } else {
    next()
  }
})*/

export default router
