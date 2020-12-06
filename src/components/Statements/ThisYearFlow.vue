<template>
  <div>
    <Flow :recordItems="thisYearList" />
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
  thisYearList = this.$store.state.thisYearItems;
}
</script>

<style></style>
