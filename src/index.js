import Vue from 'vue';

import FirebaseInstance from './firebase';

import App from './app.vue';
import './app.scss';
import { router } from './routing';

Vue.prototype.$auth = FirebaseInstance.auth();

new Vue({
  router,
  render: (create) => create(App),
}).$mount('#app');
