<template>
  <transition name="fade" mode="out-in">
    <div v-if="!isLoading && error">
      <b-alert show variant="danger">
        <h2 class="alert-heading">Verification Error</h2>
        <p>
          We are unable to verify your email address at this time. Please
          <!-- TODO: add redirect param to verify email -->
          <b-link to="/login" class="alert-link"
            >click here to login and verify your email address</b-link
          >.
        </p>
      </b-alert>
    </div>
    <div v-else-if="!isLoading">
      <b-alert show variant="success">
        <h2 class="alert-heading">Email Verified</h2>
        <p>
          Registration is complete. You can now
          <b-link to="/login" class="alert-link">log in</b-link>.
        </p>
      </b-alert>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { detectEmailConfirmationToken } from '@/helpers/authorise-tokens';

export default {
  name: 'VerifyEmail',

  data() {
    return {
      error: false,
    };
  },

  computed: {
    ...mapState('app', ['isLoading']),
  },

  mounted() {
    const token = detectEmailConfirmationToken();
    if (token) {
      this.setLoading(true);
      this.attemptConfirmation(token)
        .then((resp) => {
          // eslint-disable-next-line no-console
          console.info(`${resp.email} has been confirmed.`);
        })
        .catch((err) => {
          this.error = true;
          // eslint-disable-next-line no-console
          console.error(err, 'Error verifying email token');
        })
        .finally(() => {
          this.setLoading(false);
        });
    } else {
      this.error = true;
    }
  },

  methods: {
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['attemptConfirmation']),
  },
};
</script>
