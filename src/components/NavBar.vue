<template>
  <b-navbar
    :class="{ 'logged-in': currentUser }"
    class="nav-bar"
    toggleable="md"
    type="light"
    variant="light"
  >
    <b-collapse v-if="currentUser" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/test">Test</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <b-navbar-toggle v-if="currentUser" target="nav-collapse"></b-navbar-toggle>
    <transition name="fade" mode="out-in">
      <div v-if="$route.path !== '/'" class="brand">
        <b-navbar-brand to="/" center>
          <h1 class="title">52 Week Savings Challenge</h1>
        </b-navbar-brand>
      </div>
    </transition>

    <b-dropdown v-if="currentUser" class="user-dropdown" no-caret right variant="link">
      <template v-slot:button-content>
        <span class="avatar"
          ><img v-if="avatarImage" :src="avatarImage" variant="primary" />
          <b-avatar v-else :text="userInitials" variant="primary"
        /></span>
      </template>
      <b-dropdown-item to="/user/settings">Settings</b-dropdown-item>
      <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
    </b-dropdown>
    <b-button
      v-else
      class="login"
      to="/login"
      :pressed="$route.path === '/login'"
      right
      variant="link"
      >Log In</b-button
    >
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['currentUser', 'userInitials', 'userProfilePicture']),

    avatarImage() {
      return this.userProfilePicture('80x80');
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
  justify-content: space-between;

  .brand {
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    text-align: center;

    a {
      margin-right: 0;

      .title {
        color: #000;
        font-family: 'Rancho', cursive;
        font-size: 1em;
        font-weight: bold;
        margin-bottom: 0;

        @include media-breakpoint-up(sm) {
          font-size: 1.5em;
        }

        &:hover {
          color: rgb(80, 80, 80);
        }
      }

      &:hover {
        text-decoration: none;
      }
    }
  }

  .navbar-collapse {
    @include media-breakpoint-up(md) {
      flex-basis: auto;
      flex-grow: 0;
    }
  }

  .navbar-collapse,
  .navbar-toggler,
  .login {
    z-index: 1;
  }

  .user-dropdown {
    .avatar {
      img {
        border-radius: 50%;
        height: 40px;
        object-fit: cover;
        width: 40px;
      }
    }
  }

  .login {
    margin-left: auto;
  }

  &.logged-in {
    .brand {
      bottom: 17px;

      @include media-breakpoint-up(sm) {
        bottom: 12px;
      }
    }
  }
}
</style>
