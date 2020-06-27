<template>
  <div>
    <h1>Log In</h1>
    <b-alert variant="danger" :show="loginError"
      >Oops, something went wrong! Please try again.</b-alert
    >
    <b-form novalidate @submit="login">
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model.trim="$v.form.email.$model"
          :state="getFieldState('email')"
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
          :state="getFieldState('password')"
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
      loginError: false,
    };
  },
  validations: {
    form: {
      email: { required },
      password: { required },
    },
  },
  methods: {
    ...mapActions('auth', ['attemptLogin']),

    login(e) {
      e.preventDefault();
      this.loginError = false;
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.attemptLogin({ email: this.form.email, password: this.form.password })
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          // TODO - parse out response errors
          this.loginError = true;
          // eslint-disable-next-line no-console
          console.error(error, 'Login failed');
        });
    },
  },
};
</script>

<style></style>
