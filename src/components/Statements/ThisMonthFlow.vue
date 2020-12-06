<template>
  <div>
    <Flow :recordItems="thisMonthList" />
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
  thisMonthList = this.$store.state.thisMonthItems;
}
</script>

<style></style>
