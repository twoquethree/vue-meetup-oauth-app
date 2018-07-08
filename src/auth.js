// auth.js

import Vue from "vue";
import querystring from "querystring";
import axios from "axios";

const redirect_uri =
  process.env.VUE_APP_REDIRECT_URI || "http://localhost:8081/callback";
const client_id = process.env.VUE_APP_MEETUP_CLIENT_ID;
const response_type = "code";
const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

axios.defaults.baseURL = apiEndpoint;

let auth = new Vue({
  computed: {
    accessToken: {
      get: function() {
        return localStorage.getItem("access_token");
      },
      set: function(accessToken) {
        localStorage.setItem("access_token", accessToken);
      }
    },
    refreshToken: {
      get: function() {
        return localStorage.getItem("refresh_token");
      },
      set: function(refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    },
    expiresIn: {
      get: function() {
        return localStorage.getItem("expires_at");
      },
      set: function(expiresIn) {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime());
        localStorage.setItem("expires_at", expiresAt);
      }
    },
    tokenType: {
      get: function() {
        return localStorage.getItem("token_type");
      },
      set: function(tokenType) {
        localStorage.setItem("token_type", tokenType);
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
      const date = new Date().getTime();

      return date < this.expiresIn;
    },
    async handleAuthentication(code) {
      /**
       * USING RESPONSE TYPE = code
       */
      try {
        const { data } = await axios.post(
          "/token?" +
            querystring.stringify({
              code
            })
        );

        this.expiresIn = data.expires_in;
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.tokenType = data.token_type;

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
});

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth;
  }
};
