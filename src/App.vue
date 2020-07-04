<template>
  <div>
    <component :is="layout">
      <transition
        name="fade"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </component>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from '@/components/Loading';

const defaultLayout = 'default';

/*
 * Fade transition from: https://markus.oberlehner.net/blog/vue-router-page-transitions/
 */

export default {
  name: 'App',

  components: {
    Loading,
  },

  data() {
    return {
      prevViewHeight: 0,
    };
  },

  computed: {
    ...mapState('app', ['loading']),

    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout';
    },
  },

  methods: {
    beforeLeave(element) {
      this.prevViewHeight = getComputedStyle(element).height;
    },

    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevViewHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },

    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
};
</script>

<style lang="scss">
// fade page transition ---------------------------
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// Legacy -----------------------------------------
.app-background {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}
</style>
