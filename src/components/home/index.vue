<template>
  <div>
    <div class="hidden">
      Currently logged in.
      This is the bridger component.
      Used inside iframes.
    </div>

    <button @click="logout">
      Log Out
    </button>
  </div>
</template>

<script>
import postRobot from 'post-robot';

export default {
  data() {
    const { hostname } = window.parent.location;
    const allowCommunication = hostname.endsWith(process.env.VUE_APP_HOSTNAME_MUST_END_WITH);
    console.log(hostname, process.env.VUE_APP_HOSTNAME_MUST_END_WITH, 'allowCommunication', allowCommunication);

    return { allowCommunication };
  },
  mounted() {
    this.logout$ = this.$auth.logout$.subscribe(() => {
      console.log(`logout event triggered at ${new Date().toLocaleString()}`);

      if (this.allowCommunication) {
        postRobot.send(window.parent, 'logout');
      }
      this.$router.push('/login');
    });

    if (this.allowCommunication) {
      const listeners = {
        invalidateSession: () => this.$auth.logout(),
        isAuthenticated: () => this.$auth.isAuthenticated(),
        hasAccessTo: (x) => this.$auth.hasAccessTo(x),
      };

      Object.keys(listeners).forEach((event) => {
        postRobot.on(event, (...args) => {
          console.log(`Fired ${event} listener at ${new Date().toLocaleString()}`);
          listeners[event](...args);
        });
      });
    }
  },
  beforeDestroy() {
    this.logout$.unsubscribe();
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
