<template>
  <div class="nav-bar">
    <transition name="fade" mode="out-in">
      <b-link v-if="$route.path !== '/'" to="/">
        <h1 class="title">52 Week Savings Challenge</h1>
      </b-link>
    </transition>
    <div class="user-dropdown">
      <b-dropdown v-if="currentUser" right variant="link">
        <template v-slot:button-content>
          <span class="avatar"
            ><b-avatar v-if="userProfilePicture" :src="userProfilePicture" />
            <b-avatar v-else :text="initials" variant="primary" /></span
          >{{ userDisplayName }}
        </template>
        <b-dropdown-item to="/user/settings">Settings</b-dropdown-item>
        <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
      </b-dropdown>
      <b-button v-else to="/login" :pressed="$route.path === '/login'" variant="link"
        >Log In</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['currentUser', 'userDisplayName', 'userProfilePicture']),

    initials() {
      return (
        this.userDisplayName &&
        this.userDisplayName
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
  height: 40px;
  justify-content: center;
  margin: $gutter-width;
  position: relative;
  z-index: 1;

  a {
    .title {
      color: #000;
      font-family: 'Rancho', cursive;
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 0;

      &:hover {
        color: rgb(80, 80, 80);
      }
    }

    &:hover {
      text-decoration: none;
    }
  }

  .user-dropdown {
    position: absolute;
    right: 0;
    top: 0;

    .avatar {
      margin-right: 10px;
    }
  }
}
</style>
