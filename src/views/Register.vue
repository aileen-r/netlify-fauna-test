<template>
  <div>
    <!-- TODO: write some more interesting flavour text here -->
    <h1>Register for an account</h1>
    <b-form novalidate @submit="register">
      <b-form-row>
        <b-col>
          <b-form-group label="First Name" label-for="login-first-name">
            <b-form-input
              id="login-first-name"
              v-model.trim="$v.firstName.$model"
              :state="getFieldState('firstName')"
              type="text"
              placeholder="John"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Surname" label-for="login-surname">
            <b-form-input
              id="login-surname"
              v-model.trim="$v.surname.$model"
              :state="getFieldState('surname')"
              type="text"
              placeholder="Boyega"
            />
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model.trim="$v.email.$model"
          :state="getFieldState('email')"
          type="email"
          placeholder="your-name@site.com"
        />
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model.trim="$v.password.$model"
          :state="getFieldState('password')"
          type="password"
          placeholder="●●●●●●●●"
        />
      </b-form-group>
      <b-form-group label="Confirm Your Password" label-for="login-password-confirm">
        <b-form-input
          id="login-password-confirm"
          v-model.trim="$v.passwordConfirm.$model"
          :state="getFieldState('passwordConfirm')"
          type="password"
          placeholder="●●●●●●●●"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Sign Me Up</b-button>
    </b-form>
    <p>Already have an account? <b-link to="/login">Log In</b-link></p>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  mixins: [validationMixin],
  data() {
    return {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  validations: {
    firstName: {
      required,
    },
    surname: {
      required,
    },
    email: {
      required,
    },
    password: {
      required,
    },
    passwordConfirm: {
      required,
    },
  },
  methods: {
    getFieldState(field) {
      return this.$v[field].$dirty ? !this.$v[field].$invalid : null;
    },
    register(e) {
      e.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) return;
      console.log('register');
    },
    validate(field) {
      if (!this.touched[field]) return { valid: null };
      if (this[field] === '') return { valid: false, message: 'Required' };
      const password = this.password;
      switch (field) {
        case 'email':
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
            return { valid: false, message: 'Please enter a valid email address' };
          }
        // fall through
        case 'password':
          if (password.length < 8) {
            return 'Your password must be at least 8 characters long.';
          }
          if (!/[A-Z]/.test(password)) {
            return 'Your password must contain at least one uppercase letter.';
          }
          if (!/[a-z]/.test(password)) {
            return 'Your password must contain at least one lowercase letter.';
          }
          if (!/\d/.test(password)) {
            return 'Your password must contain at least one numeric value.';
          }
        // fall through
        default:
          console.log('default');
          return { valid: true };
      }
    },
  },
};
</script>

<style></style>
