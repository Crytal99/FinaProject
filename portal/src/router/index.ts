import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AuthView from '../views/AuthView.vue';
import ProductView from '../views/ProductView.vue';
import SubscriberView from '../views/SubscriberView.vue';
import SettingView from '../views/SettingView.vue';
import ProfileView from '../views/ProfileView.vue';
import { useAuthStore } from '../stores/auth';

/**
 * Define the routes for the application.
 */
const routes = [
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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { auth: false },
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: { auth: false },
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView,
  },
  {
    path: '/subscribers',
    name: 'subscribers',
    component: SubscriberView,
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
];

/**
 * Create the router instance.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isUserRoute = to.matched.some((record) => record.meta.auth !== false);
  if (isUserRoute) {
    const { isLoggedIn } = useAuthStore();
    if (isLoggedIn) {
      next();
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
