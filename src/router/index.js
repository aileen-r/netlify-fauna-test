import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login'),
    meta: { unauthOnly: true },
  },
  {
    path: '/register/success',
    name: 'registerSuccess',
    component: () => import('../views/RegisterSuccess'),
    meta: { unauthOnly: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register'),
    meta: { unauthOnly: true },
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: () => import('../views/VerifyEmail'),
  },
  {
    path: '/',
    name: 'about',
    component: () => import('../views/About'),
  },
  {
    path: '/old/',
    name: 'oldHome',
    component: () => import('../views/OldHome'),
    meta: { layout: 'old' },
  },
  {
    path: '/old/journals',
    name: 'journals',
    component: () => import('../views/OldAllJournals'),
    meta: { authRequired: true, layout: 'old' },
  },
  {
    path: '/old/journals/:id/posts',
    name: 'posts',
    component: () => import('../views/OldAllPosts'),
    meta: { authRequired: true, layout: 'old' },
  },
  {
    path: '/old/profile',
    name: 'profile',
    component: () => import('../views/OldProfile'),
    meta: { authRequired: true, layout: 'old' },
  },
  {
    path: '/old/recover',
    name: 'recover',
    component: () => import('../views/OldRecoverAccount'),
    meta: { layout: 'old' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  const unauthOnly = to.matched.some((route) => route.meta.unauthOnly);
  const loggedIn = store.getters['auth/loggedIn'];

  if (unauthOnly && loggedIn) {
    return next({ name: 'home', query: { redirectFrom: to.fullPath } });
  }
  if (!authRequired) {
    return next();
  }
  if (loggedIn) {
    return next();
  }
  console.warn('Page restricted. You need to login');
  next({ name: 'home', query: { redirectFrom: to.fullPath } });
});

export default router;
