<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from '@/components/Loading';

const defaultLayout = 'default';

export default {
  name: 'App',
  components: {
    Loading,
  },
  computed: {
    ...mapState('app', ['loading']),

    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout';
    },
  },
};
</script>

<style lang="scss">
// Legacy -----------------------------------------
.app-background {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>
