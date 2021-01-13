<template>
  <div>
    <p>You are logged in, in a private route.</p>
    <button @click="logout">
      Log Out
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push('/login');
    },
  },
};
</script>
