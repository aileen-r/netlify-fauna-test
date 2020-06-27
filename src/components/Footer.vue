<template>
  <div class="footer">
    <p>&copy; {{ copyYear }} Aileen Rae</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    copyYear() {
      const creationYear = '2020';
      const thisYear = new Date().getFullYear().toString();
      return thisYear === creationYear ? thisYear : `${creationYear}-${thisYear}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  bottom: 0;
  color: $text-color-muted;
  font-size: small;
  padding: $gutter-width;
  position: absolute;
  text-align: center;
  width: 100%;

  p {
    margin-bottom: 0;
  }
}
</style>
