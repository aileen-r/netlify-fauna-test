/*
 * formMixin.js
 * compainion mixin for Vulidate's validationMixin and Bootstrap-Vue form templates
 */

const formMixin = {
  methods: {
    getFieldState(field) {
      return this.$v.form[field].$dirty ? !this.$v.form[field].$invalid : null;
    },
  },
};

export default formMixin;
