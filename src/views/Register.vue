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
            <b-form-invalid-feedback :state="getFieldState('firstName')">
              Required
            </b-form-invalid-feedback>
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
            <b-form-invalid-feedback :state="getFieldState('surname')">
              Required
            </b-form-invalid-feedback>
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
        <b-form-invalid-feedback :state="getFieldState('email')">
          {{ !$v.email.email ? 'Please enter a valid email address' : 'Required' }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model.trim="$v.password.$model"
          :state="getFieldState('password')"
          type="password"
          placeholder="●●●●●●●●"
        />
        <b-form-invalid-feedback :state="getFieldState('password')">
          {{ passwordErrorMessage }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Confirm Your Password" label-for="login-password-confirm">
        <b-form-input
          id="login-password-confirm"
          v-model.trim="$v.passwordConfirm.$model"
          :state="getFieldState('passwordConfirm')"
          type="password"
          placeholder="●●●●●●●●"
        />
        <b-form-invalid-feedback :state="getFieldState('passwordConfirm')">
          {{ !$v.passwordConfirm.sameAsPassword ? 'Password does not match' : 'Required' }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign Me Up</b-button>
    </b-form>
    <p>Already have an account? <b-link to="/login">Log In</b-link></p>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { email, required, sameAs } from 'vuelidate/lib/validators';

// Password validators
const containsLowercase = (val) => /(?=.*[a-z])/.test(val);
const containsUppercase = (val) => /(?=.*[a-z])/.test(val);
const containsNumeric = (val) => /(?=.*\d)/.test(val);

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
      email,
    },
    password: {
      required,
      containsLowercase,
      containsUppercase,
      containsNumeric,
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },

  computed: {
    passwordErrorMessage() {
      if (!this.$v.password.required) return 'Required';
      if (!this.$v.password.containsLowercase) {
        return 'Your password should contain at least one lowercase letter';
      }
      if (!this.$v.password.containsUppercase) {
        return 'Your password should contain at least one uppercase letter';
      }
      if (!this.$v.password.containsNumber) {
        return 'Your password should contain at least one number';
      }
      return '';
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
  },
};
</script>

<style></style>
