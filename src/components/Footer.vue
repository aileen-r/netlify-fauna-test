<template>
  <div class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Aileen Rae</p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  bottom: 0;
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
