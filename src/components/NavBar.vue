<template>
  <div class="nav-bar">
    <div>Navigation will go here...</div>
    <b-dropdown v-if="currentUser" right variant="link">
      <template v-slot:button-content>
        <span class="avatar"><b-avatar :text="initials" variant="primary" /></span
        >{{ currentUserDisplayName }}
      </template>
      <b-dropdown-item disabled>Settings</b-dropdown-item>
      <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
    </b-dropdown>
    <b-button v-else to="/login" :pressed="$route.path === '/login'" variant="link"
      >Log In</b-button
    >
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
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['attemptLogout']),
    logout() {
      this.setLoading(true);
      this.attemptLogout()
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          location.reload();
          // eslint-disable-next-line no-console
          console.error('problem with logout', error);
        })
        .finally(() => {
          this.setLoading(false);
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

  .avatar {
    margin-right: 10px;
  }
}
</style>
