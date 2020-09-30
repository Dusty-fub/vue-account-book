<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
    <Nav />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Layout",
  components: {
    HelloWorld,
  },
};
</script>

<style lang='scss' scoped>
@import '~@/assets/css/layout.scss';

</style>
