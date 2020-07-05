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
            ><img v-if="avatarImage" :src="avatarImage" variant="primary" />
            <b-avatar v-else :text="userInitials" variant="primary" /></span
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
    ...mapGetters('auth', ['currentUser', 'userDisplayName', 'userInitials', 'userProfilePicture']),

    avatarImage() {
      return this.userProfilePicture('90x90');
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

      img {
        border-radius: 50%;
        height: 45px;
        object-fit: cover;
        width: 45px;
      }
    }
  }
}
</style>
