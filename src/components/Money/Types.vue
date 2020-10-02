<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
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
