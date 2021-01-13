<template>
  <div>
    <input
      v-model="email"
      type="text"
      placeholder="email"
    >
    <input
      v-model="password"
      type="password"
      placeholder="password"
    >
    <button @click="login">
      Log In
    </button>
    <router-link to="/signup">
      Don't have an account?
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async login() {
      await this.$auth.login(this.email, this.password);
      this.$router.push('/');
    },
  },
};
</script>
