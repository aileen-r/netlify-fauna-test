<template>
  <div class="nav-bar">
    <div>Navigation will go here...</div>
    <b-dropdown v-if="currentUser" right>
      <template v-slot:button-content>
        <b-avatar :text="initials" variant="primary" />{{ currentUserDisplayName }}
      </template>
      <b-dropdown-item disabled>Settings</b-dropdown-item>
      <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
    </b-dropdown>
    <b-button v-else to="/login" variant="link">Log In</b-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['currentUser', 'currentUserDisplayName']),
    initials() {
      return (
        this.currentUserDisplayName &&
        this.currentUserDisplayName
          .split(' ')
          .map((x) => x[0].toUpperCase())
          .join('')
      );
    },
  },
  methods: {
    ...mapActions('auth', ['attemptLogout']),
    logout() {
      this.attemptLogout()
        .then((resp) => {
          this.$router.push('/');
          console.log('logged out', resp);
        })
        .catch((error) => {
          alert('problem with logout');
          location.reload();
          console.error('problem with logout', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: $gutter-width;
  position: relative;
  z-index: 1;
}
</style>
