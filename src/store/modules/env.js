export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      isDevEnvironment: false,
      loading: false,
      siteURL: null,
    };
  },

  getters: {
    isDevEnvironment: (state) => state.isDevEnvironment,
    siteURL: (state) => state.siteURL,
  },

  mutations: {
    SET_DEV_ENV(state, value) {
      state.isDevEnvironment = value;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_SITE_URL(state, value) {
      state.siteURL = value;
    },
  },

  actions: {
    /**
     * Set global loading state
     * @param {*} store - vuex store object
     * @param {boolean} loading - is loading
     */
    setLoading({ commit }, loading) {
      commit('SET_LOADING', loading);
    },
  },
};
