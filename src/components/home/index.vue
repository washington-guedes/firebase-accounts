<template>
  <div>
    <p>You are logged in, in a private route.</p>

    <p>¿ can this be the page to be loaded in the iframe via the client.js ?</p>

    <p>¿ can pub-sub methods be defined in this component ?</p>

    <button @click="logout">
      Log Out
    </button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$logout = this.$auth.$logout.subscribe(() => {
      console.log(`logout event triggered at ${new Date().toLocaleString()}`);

      // ¿ emit logout event to the iframe container ?
      // The parent window can show some modal before calling the redirectToLogin method

      this.$router.push('/login');
    });
  },
  beforeDestroy() {
    this.$logout.unsubscribe();
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
