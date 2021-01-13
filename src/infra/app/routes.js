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
        console.log('beforeEnter /home');
        console.log('user', Vue.prototype.$auth.user());
        next();
      },
    },
    {
      path: '/login',
      component: () => import('../../components/login/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /login');
        console.log('user', Vue.prototype.$auth.user());
        next();
      },
    },
    {
      path: '/signup',
      component: () => import('../../components/signup/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /signup');
        console.log('user', Vue.prototype.$auth.user());
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
