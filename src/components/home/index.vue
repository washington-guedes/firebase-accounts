<template>
  <div>
    <p>You are logged in, in a private route.</p>

    <p>¿ iframe page to be loaded ?</p>

    <p>¿ can pub-sub methods be defined in this component ?</p>

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
