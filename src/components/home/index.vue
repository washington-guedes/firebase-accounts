<template>
  <div>
    <p>
      Currently logged in.
    </p>

    <button @click="logout">
      Log Out
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
