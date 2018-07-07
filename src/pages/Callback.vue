<template>
    <div>This is the Callback Page.</div>
</template>

<script>
export default {
  name: "callback",
  mounted() {
    const code = this.$route.query.code;
  }
};
</script>

