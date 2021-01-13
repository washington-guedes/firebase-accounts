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
        console.log('beforeEnter /home, isAuthenticated', Vue.prototype.$auth.isAuthenticated());

        next();
      },
    },
    {
      path: '/login',
      component: () => import('../../components/login/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /login');
        next();
      },
    },
    {
      path: '/signup',
      component: () => import('../../components/signup/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /signup');
        next();
      },
    },
    {
      path: '*',
      redirect: () => '/login',
    },
  ],
});

export default router;
