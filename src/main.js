import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import attemptToAuthoriseTokens from './helpers/authorise-tokens';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

store.dispatch('auth/initAuth');

attemptToAuthoriseTokens();

Vue.config.productionTip = false;

// Register a global custom directive called `v-focus`
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus();
  },
});
