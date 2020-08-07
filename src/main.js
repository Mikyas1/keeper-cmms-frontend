import Vue from 'vue'
import App from './App.vue'
import router from "./resources/router";
import store from "./resources/store";
import http from "./resources/http";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// eliminate the error rasid by vuetify.
const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <div>.';
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  { if (msg !== ignoreWarnMessage) { console.error("[Vue warn]: " + msg + trace); } }
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var vm = this;
    http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          vm.$store.dispatch("auth/logout");
          vm.$router.push({ name: "logout" });
        } else {
          throw err;
        }
      });
    });
  },
}).$mount('#app')
