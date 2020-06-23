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
  // If the route doesnt have a `meta.authRequired` property go on ahead!
  if (!authRequired) {
    return next();
  }
  // If we go this far then it must have the `meta.authRequired`. But is there is a user logged in? If so, then go right on ahead!
  if (store.getters['auth/loggedIn']) {
    return next();
  }
  // The page requested is both secured and there is no logged in user detected. Sorry mate. No entry!
  console.warn('Page restricted, you need to login');
  next({ name: 'home', query: { redirectFrom: to.fullPath } });
});

export default router;
