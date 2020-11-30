<template>
  <nav class="nav">
    <router-link
      to="/statements"
      active-class="selected"
    >
      <Icon name="#label" />
      <div>流水</div>
    </router-link>
    <router-link
      to="/money"
      active-class="selected"
    >
      <Icon name="#money" />
      <div>记账</div>
    </router-link>
    <router-link
      to="/statistics"
      active-class="selected"
    >
      <Icon name="#statistics" />
      <div>统计</div>
    </router-link>
  </nav>
</template>

<script lang="ts" scoped>
import Icon from "@/components/Icon.vue";
export default {
  data() {
    return {};
  },
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/css/nav.scss';

</style>
