<template>
  <div class="app-background">
    <NavBar />

    <slot />

    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
export default {
  name: 'OldLayout',
  components: {
    NavBar,
    Footer,
  },
};
</script>
