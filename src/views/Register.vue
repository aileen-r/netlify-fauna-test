<template>
  <div>
    <!-- TODO: write some more interesting flavour text here (see reddit) -->
    <h2>Register for an account</h2>
    <b-alert variant="danger" :show="!!registerError"> {{ registerError }}</b-alert>
    <b-form novalidate @submit="register">
      <b-form-row>
        <b-col>
          <b-form-group label="First Name" label-for="login-first-name">
            <b-form-input
              id="login-first-name"
              ref="firstName"
              v-model.trim="$v.form.firstName.$model"
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
              v-model.trim="$v.form.surname.$model"
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
          v-model.trim="$v.form.email.$model"
          :state="getFieldState('email')"
          type="email"
          placeholder="your-name@site.com"
        />
        <b-form-invalid-feedback :state="getFieldState('email')">
          {{ !$v.form.email.email ? 'Please enter a valid email address' : 'Required' }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model.trim="$v.form.password.$model"
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
          v-model.trim="$v.form.passwordConfirm.$model"
          :state="getFieldState('passwordConfirm')"
          type="password"
          placeholder="●●●●●●●●"
        />
        <b-form-invalid-feedback :state="getFieldState('passwordConfirm')">
          {{ !$v.form.passwordConfirm.sameAsPassword ? 'Password does not match' : 'Required' }}
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

import formMixin from '@/mixins/formMixin';
import { mapActions } from 'vuex';

// Password validators
const containsLowercase = (val) => /(?=.*[a-z])/.test(val);
const containsUppercase = (val) => /(?=.*[A-Z])/.test(val);
const containsNumeric = (val) => /(?=.*\d)/.test(val);

export default {
  name: 'Register',

  mixins: [validationMixin, formMixin],

  data() {
    return {
      form: {
        firstName: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      registerError: '',
    };
  },

  validations: {
    form: {
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
  },

  computed: {
    passwordErrorMessage() {
      if (!this.$v.form.password.required) return 'Required';
      if (!this.$v.form.password.containsLowercase) {
        return 'Your password should contain at least one lowercase letter';
      }
      if (!this.$v.form.password.containsUppercase) {
        return 'Your password should contain at least one uppercase letter';
      }
      if (!this.$v.form.password.containsNumber) {
        return 'Your password should contain at least one number';
      }
      return '';
    },
  },

  mounted() {
    this.$refs.firstName.$el.focus();
  },

  methods: {
    ...mapActions('app', ['setLoading']),
    ...mapActions('auth', ['attemptSignup']),

    register(e) {
      e.preventDefault();
      this.registerError = false;
      this.$v.form.$touch();
      if (this.$v.form.$invalid) return;
      this.setLoading(true);
      this.attemptSignup(this.form)
        .then((res) => {
          const emailUri = encodeURIComponent(res.email);
          this.$router.push(`/register/success?email=${emailUri}`);
        })
        .catch((error) => {
          if (error.data) {
            this.registerError = error.data;
          }
          if (error.json) {
            if (error.json['error_description']) {
              this.registerError = error.json['error_description'];
            } else {
              this.registerError = error.json.msg;
            }
          }
          if (!this.registerError) {
            this.registerError = 'Oops, something went wrong! Please try again';
          }
          // eslint-disable-next-line no-console
          console.error(error, 'Register error');
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  },
};
</script>
