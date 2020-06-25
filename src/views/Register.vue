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
              v-model="values.firstName"
              type="text"
              placeholder="John"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Surname" label-for="login-surname">
            <b-form-input
              id="login-surname"
              v-model="values.surname"
              :state="validate('surname').valid"
              type="text"
              placeholder="Boyega"
            />
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model="values.email"
          type="email"
          placeholder="your-name@site.com"
        />
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model="values.password"
          type="password"
          placeholder="●●●●●●●●"
        />
      </b-form-group>
      <b-form-group label="Confirm Your Password" label-for="login-password-confirm">
        <b-form-input
          id="login-password-confirm"
          v-model="values.passwordConfirm"
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
export default {
  name: 'Register',
  data() {
    return {
      touched: {},
      values: {
        firstName: '',
        surname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  methods: {
    blur(field) {
      if (!this.touched[field]) {
        this.$set(this.touched, field, true);
      }
    },
    register(e) {
      e.preventDefault();
      console.log('register');
    },
    validate(field) {
      if (!this.touched[field]) return { valid: null };
      if (this.values[field] === '') return { valid: false, message: 'Required' };
      const password = this.values.password;
      switch (field) {
        case 'email':
          if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.values.email)) {
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
