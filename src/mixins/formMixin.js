/*
 * formMixin.js
 * compainion mixin for Vulidate's validationMixin and Bootstrap-Vue form templates
 */

const formMixin = {
  methods: {
    getFieldState(field) {
      return this.$v[field].$dirty ? !this.$v[field].$invalid : null;
    },
  },
};

export default formMixin;
