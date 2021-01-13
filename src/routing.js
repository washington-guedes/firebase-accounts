import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./home/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /home', this.$auth);
        next();
      },
    },
    {
      path: '/login',
      component: () => import('./login/index.vue'),
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter /login');
        next();
      },
    },
    {
      path: '/signup',
      component: () => import('./signup/index.vue'),
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
