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
    <input
      v-model="confirm"
      type="password"
      placeholder="confirm password"
    >
    <button @click="signup">
      Sign Up
    </button>
    <router-link to="/login">
      Already have an account?
    </router-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    confirm: '',
  }),
  methods: {
    async signup() {
      if (this.password !== this.confirm) {
        this.$toast.error('Confirm password failed');
        return;
      }
      await this.$auth.signup(this.email, this.password);
      this.$toast.success('User created');
      this.$router.push('/login');
    },
  },
};
</script>
