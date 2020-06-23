<template>
  <div>
    <div>Nav bar will go here</div>
    <b-container>
      <slot />
    </b-container>
    <div>Footer</div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>
