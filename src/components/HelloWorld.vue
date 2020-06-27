<template>
  <div class="hello-world">
    <div class="hello-world-content">
      <b-container>
        <h1>52 Week Savings Challenge</h1>
        <p>Hello World. 👋</p>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<style lang="scss" scoped>
.hello-world {
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  .hello-world-content {
    text-align: center;

    h1 {
      font-family: 'Rancho', cursive;
      font-size: 3em;
      font-weight: bold;
      margin-bottom: 0.4em;
    }
  }
}
</style>
