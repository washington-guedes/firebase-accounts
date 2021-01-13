import Vue from 'vue';
import VueRouter from 'vue-router';

import FirebaseInstance from './firebase';

import App from './app.vue';
import './app.scss';
import { router } from './routing';

Vue.use(VueRouter);

new Vue({
  router,
  render: (create) => create(App),
}).$mount('#app');

Vue.prototype.$auth = FirebaseInstance.auth();
