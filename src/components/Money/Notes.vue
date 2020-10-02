<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" v-model="value" placeholder="在这里输入备注" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  @Watch("value")
  onValueChanged(val: string, oldVal: string) {
    this.$emit("update:value", val);
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/Money/notes.scss';

</style>
