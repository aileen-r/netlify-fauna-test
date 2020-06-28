<template>
  <div>
    <h2>Please verify your email address</h2>
    <p>
      An email has been sent to <strong v-if="userEmail">{{ userEmail }}</strong
      ><template v-else>you</template>. Click the link in the email to verify your account.
    </p>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
  computed: {
    userEmail() {
      return this.$route.query && this.$route.query.email
        ? decodeURIComponent(this.$route.query.email)
        : '';
    },
  },
};
</script>

<style></style>
