<template>
  <div>
    <ol>
      <li v-for="(item, index) in thisWeekList" :key="index">
        <span>{{ item.createTime }}</span>
        <span>{{ item.tag + "|" + item.amount }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
export default class extends vue {
  thisWeekList = this.$store.state.thisWeekItems;
}
</script>

<style></style>
