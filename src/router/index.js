import Vue from 'vue';
import Router from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import ListView from '@/views/ListView.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: LoginView, meta: { public: true } },
    { path: '/list', component: ListView, meta: { requiresAuth: true } },
    { path: '*', redirect: '/list' },
  ],
});

router.beforeEach((to, _, next) => {
  const isAuth = !!localStorage.getItem('token');
  if (!to.meta.public && !isAuth) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.path === '/login' && isAuth) {
    next('/list');
  } else {
    next();
  }
});

export default router;
