<template>
  <div>
    <h2>Log In</h2>
    <b-alert variant="danger" :show="!!loginError">{{ loginError }}</b-alert>
    <b-form novalidate @submit="login">
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          ref="email"
          v-model.trim="$v.form.email.$model"
          :state="getFieldState('email') === true ? null : getFieldState('email')"
          type="email"
          required
          placeholder="your-name@site.com"
        />
        <b-form-invalid-feedback :state="getFieldState('email')">
          Oops, we need your email address to log you in
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model.trim="$v.form.password.$model"
          :state="getFieldState('password') === true ? null : getFieldState('password')"
          type="password"
          required
          placeholder="●●●●●●●●"
        />
        <b-form-invalid-feedback :state="getFieldState('password')">
          Oops, we need your password to log you in
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
    <p>New here? <b-link to="/register">Register</b-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import formMixin from '@/mixins/formMixin';

export default {
  name: 'Login',
  mixins: [validationMixin, formMixin],
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loginError: '',
      redirect: '/',
    };
  },

  validations: {
    form: {
      email: { required },
      password: { required },
    },
  },

  mounted() {
    if (this.$route.query && this.$route.query.redirectFrom) {
      this.redirect = this.$route.query.redirectFrom;
    }
    this.$refs.email.$el.focus();
  },

  methods: {
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['attemptLogin']),

    login(e) {
      e.preventDefault();
      this.loginError = '';
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.setLoading(true);
      this.attemptLogin({ email: this.form.email, password: this.form.password })
        .then(() => {
          this.$router.push(this.redirect);
        })
        .catch((error) => {
          // Wrapping in try/catch since I'm guessing at error response structure
          try {
            if (error.data) {
              this.loginError = error.data;
            }
            if (error.json) {
              if (error.json.error === 'invalid_grant') {
                this.loginError = 'Invalid email address or password';
              } else {
                this.loginError = error.json['error_description'];
              }
            }
          } catch (err) {
            console.error(err, 'Login handling error');
          }

          if (!this.loginError) {
            this.loginError = 'Oops, something went wrong. Please try again.';
          }
          // eslint-disable-next-line no-console
          console.error(error, 'Login failed');
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
};
</script>
