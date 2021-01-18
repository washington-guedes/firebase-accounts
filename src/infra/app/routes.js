import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../../components/home/index.vue'),
      beforeEnter: (to, from, next) => {
        Vue.prototype.$auth.isAuthenticated().then((yes) => (yes ? next() : next('/login')));
      },
    },
    {
      path: '/login',
      component: () => import('../../components/login/index.vue'),
      beforeEnter: (to, from, next) => {
        Vue.prototype.$auth.logout().then(() => next());
      },
    },
    {
      path: '/signup',
      component: () => import('../../components/signup/index.vue'),
      beforeEnter: (to, from, next) => {
        Vue.prototype.$auth.logout().then(() => next());
      },
    },
    {
      path: '*',
      redirect: () => '/',
    },
  ],
});

export default router;
