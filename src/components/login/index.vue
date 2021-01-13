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
    login() {
      console.log('TODO: login');
    },
  },
};
</script>
