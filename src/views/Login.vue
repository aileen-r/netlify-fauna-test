<template>
  <div>
    <h1>Log In</h1>
    <b-form @submit="login">
      <b-form-group label="Email address" label-for="login-email">
        <b-form-input
          id="login-email"
          v-model="form.email"
          type="email"
          required
          placeholder="your-name@site.com"
        />
      </b-form-group>
      <b-form-group label="Password" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model="form.password"
          type="password"
          required
          placeholder="●●●●●●●●"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
    <p>New here? <b-link to="/register">Register</b-link></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      console.log('login');
    },
  },
};
</script>

<style></style>
