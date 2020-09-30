<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="#money" />
      记账
    </router-link>
    <router-link to="/labels">
      <Icon name="#label" />
      标签
    </router-link>
    <router-link to="/statistics">
      <Icon name="#statistics" />
      统计
    </router-link>
  </div>
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
