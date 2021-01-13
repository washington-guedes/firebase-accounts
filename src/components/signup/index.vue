<template>
  <div>
    <input
      v-model="email"
      type="text"
      placeholder="email"
    >
    <input
      v-model="password"
      type="text"
      placeholder="password"
    >
    <input
      v-model="confirm"
      type="text"
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
    goToLogin() {
      this.$router.push('/login');
    },
    signup() {
      console.log('TODO: signup');
    },
  },
};
</script>
