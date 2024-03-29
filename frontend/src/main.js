import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSocketIO from 'vue-socket.io';
import io from "socket.io-client";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

/* Vue.use(new VueSocketIO({
  debug: false,
  connection: 'ws://127.0.0.1:8000',
  vuex: {
      store,
      actionPrefix: 'socket_',
  }
})); */

const socket = io('https://sportshopsj.herokuapp.com/', {
  withCredentials: true,
});
export default socket;



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
