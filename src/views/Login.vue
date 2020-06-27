<template>
  <div>
    <h1>Log In</h1>
    <b-form novalidate @submit="login">
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model.trim="$v.email.$model"
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
          v-model.trim="$v.password.$model"
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
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

import formMixin from '@/mixins/formMixin';

export default {
  name: 'Login',
  mixins: [validationMixin, formMixin],
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations: {
    email: { required },
    password: { required },
  },
  methods: {
    login(e) {
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) return;
      console.log('login');
    },
  },
};
</script>

<style></style>
