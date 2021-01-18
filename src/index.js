import Vue from 'vue';
import { AuthService } from './services/auth';
import { ToastService } from './services/toast';

import 'toastify-js/src/toastify.css';

import layout from './infra/app/layout.vue';
import { router } from './infra/app/routes';
import './infra/app/styles.scss';

Vue.prototype.$auth = new AuthService();
Vue.prototype.$toast = new ToastService();

new Vue({
  router,
  render: (create) => create(layout),
}).$mount('#app');
