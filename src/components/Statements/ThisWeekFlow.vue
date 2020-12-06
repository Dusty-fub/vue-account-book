<template>
  <div>
    <Flow :recordItems="thisWeekList" />
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";

import Flow from "./Flow.vue";

@Component({
  components: { Flow },
})
export default class extends vue {
  thisWeekList = this.$store.state.thisWeekItems;
}
</script>

<style lang="scss" scoped></style>
