<template>
  <div class="fullscreen-loader">
    <img alt="Loading..." class="spinner" src="@/assets/spinner.svg" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
.fullscreen-loader {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;

  .spinner {
    fill: black;
    width: 100px;
  }
}
</style>
