import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import Callback from "@/pages/Callback";

Vue.use(VueRouter);

const router = new VueRouter({
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

router.beforeEach((to, from, next) => {
  if (to.name == "callback") {
    // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) {
    // if authenticated allow access
    next();
  } else {
    // trigger auth0 login
    router.app.$auth.login();
  }
});

export default router;
