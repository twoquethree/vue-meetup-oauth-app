// auth.js

import Vue from "vue";
import querystring from "querystring";

const redirect_uri =
  process.env.VUE_APP_REDIRECT_URI || "http://localhost:8081/callback";
const client_id = process.env.VUE_APP_MEETUP_CLIENT_ID;
const response_type = "code";

let auth = new Vue({
  computed: {
    token: {
      get: function() {
        return localStorage.getItem("id_token");
      },
      set: function(id_token) {
        localStorage.setItem("id_token", id_token);
      }
    },
    accessToken: {
      get: function() {
        return localStorage.getItem("access_token");
      },
      set: function(accessToken) {
        localStorage.setItem("access_token", accessToken);
      }
    },
    expiresAt: {
      get: function() {
        return localStorage.getItem("expires_at");
      },
      set: function(expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem("expires_at", expiresAt);
      }
    },
    user: {
      get: function() {
        return JSON.parse(localStorage.getItem("user"));
      },
      set: function(user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  },
  methods: {
    login() {
      window.location.replace(
        "https://secure.meetup.com/oauth2/authorize?" +
          querystring.stringify({
            response_type,
            client_id,
            redirect_uri
          })
      );
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user");
      });
    },
    isAuthenticated() {
      return new Date().getTime() < this.expiresAt;
    },
    handleAuthentication(code) {
      /**
       * USING RESPONSE TYPE = code
       */
      console.log(code);
      return true;
    }
  }
});

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth;
  }
};
