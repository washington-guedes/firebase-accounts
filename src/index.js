import Vue from 'vue';
import { AuthService } from './services/auth';

import App from './app.vue';
import './app.scss';
import { router } from './app.routes';

Vue.prototype.$auth = new AuthService();

new Vue({
  router,
  render: (create) => create(App),
}).$mount('#app');
