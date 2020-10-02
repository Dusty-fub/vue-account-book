<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/layout.scss';

</style>
