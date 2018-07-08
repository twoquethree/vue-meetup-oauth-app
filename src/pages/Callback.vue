<template>
    <div>{{ message }}</div>
</template>

<script>
export default {
  name: "callback",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    async redirect(code) {
      try {
        this.message = "Waiting for access...";
        const accessGranted = await this.$auth.handleAuthentication(code);
        if (accessGranted) {
          this.message = "You are beign redirected to application...";
          setTimeout(() => this.$router.push({ name: "home" }), 2500);
        }
      } catch (error) {
        this.message = "Access denied";
        console.log(error);
      }
    }
  },
  mounted() {
    const code = this.$route.query.code;
    this.redirect(code);
  }
};
</script>

