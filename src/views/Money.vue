<template>
  <div class="wrapper">
    <Layout>money</Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";

export default {
  name: "Money",
  components: {
    Layout,
  },
};
</script>

<style lang='scss' scoped>
@import '~@/assets/css/money.scss';

</style>
