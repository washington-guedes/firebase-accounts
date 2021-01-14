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
  mounted() {
    const { target } = this.$router.currentRoute.query;
    if (target) {
      localStorage.setItem('target', target);
    }
  },
  methods: {
    async login() {
      await this.$auth.login(this.email, this.password);
      console.log(`logged in at ${new Date().toLocaleString()}`);

      const target = localStorage.getItem('target');
      if (target) {
        localStorage.removeItem('target');
        window.location.href = target;
      } else {
        console.log('after login, sending to home');
        this.$router.push('/');
      }
    },
  },
};
</script>
