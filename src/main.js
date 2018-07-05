import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import auth from "./auth";

Vue.config.productionTip = false;

Vue.use(auth);
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
