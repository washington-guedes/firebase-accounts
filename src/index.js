import Vue from 'vue';
import { AuthService } from './services/auth';

import layout from './infra/app/layout.vue';
import { router } from './infra/app/routes';
import './infra/app/styles.scss';

Vue.prototype.$auth = new AuthService();

new Vue({
  router,
  render: (create) => create(layout),
}).$mount('#app');
