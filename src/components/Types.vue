<template>
  <div class="typeWrap">
    <span>类型：</span>
    <div class="types">
      <button
        :class="type === '-' && 'selected'"
        @click="selectType('-')"
      > 支出 </button>
      <span> / </span>
      <button
        :class="type === '+' && 'selected'"
        @click="selectType('+')"
      >收入</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Types extends Vue {
  @Prop({ default: "-" }) readonly type!: string;
  selectType(selectedType: string) {
    if (selectedType === "-" || selectedType === "+") {
      this.$emit("update:type", selectedType);
    } else {
      throw new Error("type unknown");
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/Money/types.scss';

</style>
