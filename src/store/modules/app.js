export default {
  strict: false,
  namespaced: true,

  state() {
    return {
      loading: false,
    };
  },

  mutations: {
    SET_LOADING(state, value) {
      state.loading = value;
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
