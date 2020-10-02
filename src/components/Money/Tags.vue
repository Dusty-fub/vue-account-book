<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="item in dataSource"
        :key="item"
        @click="selectOrCancel(item)"
        :class="{ selected: selectedTags.indexOf(item) > -1 }"
      >
        {{ item }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];
  selectOrCancel(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.$emit("update:value", this.selectedTags);
  }
  createTag() {
    const name = window.prompt("请输入标签名") || "";
    if (name.trim() === "") {
      window.alert("标签名不能为空");
    } else if (this.dataSource) {
      this.$emit("update:dataSource", [...this.dataSource, name]);
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/Money/tags.scss';

</style>
