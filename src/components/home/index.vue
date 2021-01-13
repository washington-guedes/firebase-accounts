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
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login');
    },
  },
};
</script>
