import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Callback from "@/pages/Callback";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "callback",
      path: "/callback",
      component: Callback
    }
  ]
});
