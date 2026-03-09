import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogInView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
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
  } else {
    next()
  }
})

export default router
