<template>
  <div class="app-background">
    <OldNavBar />

    <slot />

    <OldFooter />
  </div>
</template>

<script>
import OldNavBar from '../components/OldNavBar';
import OldFooter from '../components/OldFooter';
export default {
  name: 'OldLayout',
  components: {
    OldNavBar,
    OldFooter,
  },
};
</script>
