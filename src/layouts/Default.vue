<template>
  <div>
    <NavBar />
    <b-container>
      <slot />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default {
  name: 'DefaultLayout',
  components: {
    NavBar,
    Footer,
  },
};
</script>
